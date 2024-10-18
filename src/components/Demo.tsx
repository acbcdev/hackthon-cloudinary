"use client";
import { useState, useRef, useEffect } from "react";

// import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useStore } from "@/lib/store";

type ChatItem = {
	type: "text" | "options";
	content: string;
	options?: string[];
	id: string;
};

function Demo() {
	const { img } = useStore();
	const [chatHistory, setChatHistory] = useState<ChatItem[]>([
		{
			type: "text",
			content: "¡Bienvenido! Por favor, elige una opción para comenzar:",
			id: "welcome",
		},
		{
			type: "options",
			content: "¿Qué te gustaría explorar?",
			options: ["Tecnología", "Arte"],
			id: "initial",
		},
	]);
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, string>
	>({});
	const scrollAreaEndRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollAreaEndRef.current) {
			scrollAreaEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chatHistory]);

	const handleSelection = (selection: string, id: string) => {
		setSelectedOptions((prev) => ({ ...prev, [id]: selection }));
		// setChatHistory((prev) => [
		// 	...prev,
		// 	{
		// 		type: "text",
		// 		content: `Has seleccionado: ${selection}`,
		// 		id: `${id}-response`,
		// 	},
		// ]);

		setTimeout(() => {
			let newText: string;
			let newOptions: string[];

			switch (selection) {
				case "Tecnología":
					newText =
						"La lluvia caía suavemente sobre la ciudad, creando un manto gris en el cielo. María observaba por la ventana, pensativa, mientras sostenía una taza de café caliente entre sus manos. El aroma a café recién hecho llenaba la habitación, trayendo consigo recuerdos de días más soleados.";
					newOptions = [
						"Inteligencia Artificial",
						"Blockchain",
						"Realidad Virtual",
					];
					break;
				case "Arte":
					newText =
						"La lluvia caía suavemente sobre la ciudad, creando un manto gris en el cielo. María observaba por la ventana, pensativa, mientras sostenía una taza de café caliente entre sus manos. El aroma a café recién hecho llenaba la habitación, trayendo consigo recuerdos de días más soleados.";
					newOptions = ["Pintura", "Escultura", "Música"];
					break;
				case "Inteligencia Artificial":
				case "Blockchain":
				case "Realidad Virtual":
					newText = `${selection} La lluvia caía suavemente sobre la ciudad, creando un manto gris en el cielo. María observaba por la ventana, pensativa, mientras sostenía una taza de café caliente entre sus manos. El aroma a café recién hecho llenaba la habitación, trayendo consigo recuerdos de días más soleados.`;
					newOptions = [
						"Historia",
						"Aplicaciones actuales",
						"Futuro potencial",
					];
					break;
				case "Pintura":
				case "Escultura":
				case "Música":
					newText = `${selection}La lluvia caía suavemente sobre la ciudad, creando un manto gris en el cielo. María observaba por la ventana, pensativa, mientras sostenía una taza de café caliente entre sus manos. El aroma a café recién hecho llenaba la habitación, trayendo consigo recuerdos de días más soleados.`;
					newOptions = ["Clásico", "Moderno", "Contemporáneo"];
					break;
				default:
					newText =
						"Interesante elección. ¿Qué te gustaría saber sobre este tema?";
					newOptions = [
						"Más información",
						"Ejemplos prácticos",
						"Recursos de aprendizaje",
					];
			}

			const newId = Date.now().toString();
			if (chatHistory.filter((i) => i.type === "options").length < 8) {
				setChatHistory((prev) => [
					...prev,
					{ type: "text", content: newText, id: `${newId}-text` },
					{
						type: "options",
						content: "Elige una opción:",
						options: newOptions,
						id: newId,
					},
				]);
			}
		}, 500);
	};

	return (
		<main className="min-h-screen p-4">
			<div className="max-w-2xl mx-auto">
				<header className="flex flex-col md:flex-row gap-6 mb-6">
					<div className="w-full md:w-1/3">
						<figure className="relative mx-auto w-full aspect-square">
							<Image
								src={img.local}
								alt="Imagen predefinida"
								width={300}
								height={300}
								layout="responsive"
								className="rounded-lg object-cover "
							/>
						</figure>
					</div>
				</header>
				<section
					className="space-y-4 py-4"
					aria-label="Historial de chat"
					ref={scrollAreaEndRef}
				>
					{chatHistory.map((item) => (
						<article key={item.id} className="mb-4">
							{item.type === "text" ? (
								<p className=" p-3 bg-secondary rounded-2xl shadow">
									{item.content}
								</p>
							) : (
								<div className="mt-2">
									<p className=" mb-2">{item.content}</p>

									<nav
										className="flex flex-wrap gap-2"
										aria-label="Opciones de selección"
									>
										{item.options?.map((option) => (
											<Button
												key={option}
												onClick={() =>
													item.id && handleSelection(option, item.id)
												}
												disabled={selectedOptions[item.id || ""] !== undefined}
												variant={
													selectedOptions[item.id || ""] === option
														? "default"
														: "outline"
												}
												className={` ${
													selectedOptions[item.id || ""] === option
														? "bg-primary text-primary-foreground hover:bg-primary/90"
														: ""
												}`}
											>
												{option}
											</Button>
										))}
									</nav>
								</div>
							)}
						</article>
					))}
				</section>
			</div>
		</main>
	);
}

Demo.displayName = "Demo";

export default Demo;
