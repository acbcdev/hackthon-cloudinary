"use client";
import { useStore } from "@/lib/store";
import { CldImage } from "next-cloudinary";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { genUniqueId } from "@/lib/utils";
import { continueHistory } from "@/actions/ai";
import { useSearchParams } from 'next/navigation'

export default function Interface({ options, }: { options: string[], }) {
	const { history, addToHistory, addToSelectedOptions, selectedOptions, maxHistory } =
		useStore();
	const searchParams = useSearchParams();
	const imgPublicId = searchParams.get('img')
	const scrollAreaEndRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {

		if (history.filter((i) => i.type === "options").length === 0)
			addToHistory({
				type: "options",
				id: genUniqueId(),
				options,
			});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollAreaEndRef.current) {
			scrollAreaEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [history]);

	async function handleSelection(selection: string, id: number) {
		addToSelectedOptions(id, selection);
		const { object } = await continueHistory(
			history
				.filter((i) => i.type === "text")
				.map((i) => i.content)
				.join(" "), selection
		);
		if (history.filter((i) => i.type === "options").length <= maxHistory) {
			addToHistory({
				type: "text",
				content: object.history,
				promptImage: object.promptImage,
				id: genUniqueId(),
			});
			addToHistory({
				type: "options",
				content: "Elige una opción:",
				options: object.options,
				id: genUniqueId(),
			});

		}
	}
	return (
		<div
			className="min-w-[80%] max-w-xl md:min-w-[60ch] mx-auto animate-in duration-300"
			ref={scrollAreaEndRef}
		>
			{history.length > 0 &&
				history.map((item) => (
					<article key={item.id} className="mb-4 space-y-2">
						{item.type === "text" ? (
							<>
								<p className=" p-3 bg-secondary rounded-2xl shadow ">
									{item.content}
								</p>

								{
									imgPublicId && item.promptImage &&
									<CldImage
										width="300"
										height="300"
										src={imgPublicId}
										sizes="100vw"
										className="rounded-xl"
										replaceBackground={{
											prompt: item.promptImage,
										}}
										alt="Description of my image"
									/>

								}
							</>
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
											className={` ${selectedOptions[item.id || ""] === option
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
		</div>
	);
}
