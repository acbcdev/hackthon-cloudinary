"use client";
import { useStore } from "@/lib/store";
// import { CldImage } from "next-cloudinary";

import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { genUniqueId } from "@/lib/utils";

export default function StoryNarrative() {
	const { img, addToHistory, history } = useStore();
	const baseOptions = [
		{
			label: "El preso zombie ",
			prompt: "zombies there ",
			styles: "bg-red-500 hover:bg-red-500",
			id: 1,
		},
		{
			label: "El Conde Dracula",
			prompt: "Zombies there ",
			styles: "bg-purple-500 hover:bg-purple-500",
			id: 2,
		},
	];

	const StartNarrative = (prompt: string) => {
		console.log(prompt);
		const miniTexto =
			"En una noche oscura y tormentosa, los zombies acechaban en las sombras, listos para atacar.";
		addToHistory({
			id: genUniqueId(),
			image: "image",
			narrative: miniTexto,
			options: [
				{
					id: genUniqueId(),
					label: "escapar",
					prompt: "zombies there ",
					styles: "bg-blue-500 hover:bg-blue-600",
				},
				{
					id: genUniqueId(),
					label: "Atacar",
					prompt: "zombies there ",
					styles: "bg-red-500 hover:bg-red-500",
				},
			],
			promptImage: prompt,
		});
	};
	console.log(history.length);
	return (
		<>
			{/* <ScrollArea className="h-screen  py-6"> */}
			<section className="grid place-content-center my-4">
				<Image
					src={img.local}
					className="bg-zinc-700 rounded-3xl mx-auto"
					alt="uploaded from the user"
					// fill
					width={500}
					height={500}
					// placeholder="blur"
				/>

				<div className="flex justify-center items-center  gap-2 my-2">
					{baseOptions.map(({ label, styles, id, prompt }) => (
						<Button
							className={`p-10 bg-purple-600  hover:scale-125 hover:z-10 transition-all ${styles}`}
							key={id}
							disabled={history.length > 0}
							onClick={() => StartNarrative(prompt)}
						>
							{label}
						</Button>
					))}
				</div>

				{history.length > 0 &&
					history.map((i, index) => (
						<div
							key={i.id}
							className="w-[80%] mx-auto grid place-content-center gap-y-3"
						>
							<p className="bg-secondary rounded-3xl p-2 ">{i.narrative}</p>

							<Image
								src={img.local}
								alt="uploaded from the user"
								className="rounded-3xl mx-auto"
								width={500}
								height={500}
							/>
							{/* <CldImage
								src={img.local}
								className="bg-zinc-700 rounded-3xl"
								alt="uploaded from the user"
								width={500}
								height={500}
								fillBackground
								replaceBackground={{ prompt: i.promptImage }}
							/> */}
							<div className="flex justify-center gap-2 my-2">
								{i.options.map(({ label, styles, id, prompt }) => (
									<Button
										className={`p-10 bg-purple-600  hover:scale-110 transition-all ${styles}`}
										key={id}
										disabled={history.length > index + 1}
										size="lg"
										onClick={() => StartNarrative(prompt)}
									>
										{label}
									</Button>
								))}
							</div>
						</div>
					))}
			</section>
			{/* </ScrollArea> */}
		</>
	);
}
