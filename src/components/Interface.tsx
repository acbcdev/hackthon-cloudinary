"use client";
import { useStore } from "@/lib/store";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { genUniqueId } from "@/lib/utils";
import { continueHistory } from "@/actions/ai";
import { useSearchParams } from 'next/navigation'
import SkeletonInterface from "./SkeletonInterface";
import { useToast } from "@/hooks/use-toast";

export default function Interface({ options, }: { options: string[], }) {
	const { history, addToHistory, addToSelectedOptions, selectedOptions, maxHistory, setLoading, loading, removeSelectedOptions } =
		useStore();
	const searchParams = useSearchParams();
	const imgPublicId = searchParams.get('img')
	const scrollAreaEndRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setLoading({ ...loading, options: true, })
		addToHistory({
			type: "options",
			id: genUniqueId(),
			options,
		})
		setLoading({ ...loading, options: false, })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollAreaEndRef.current) {
			scrollAreaEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [history, loading]);

	async function handleSelection(selection: string, id: number) {
		const withImage = history.length % 3 === 0
		setLoading({ ...loading, options: true, text: true, img: withImage })
		addToSelectedOptions(id, selection);
		// addToMessages({ role: 'user', content: selection })
		try {
			const { object } = await continueHistory(
				history.filter(({ type }) => type === 'text').join('\n'),
				selection,
			);
			if (history.filter((i) => i.type === "options").length <= maxHistory) {
				addToHistory({
					type: "text",
					content: object.history,
					promptImage: withImage ? object.promptImage : "",
					id: genUniqueId(),
				});
				addToHistory({
					type: "options",
					content: "Elige una opción:",
					options: object.options,
					id: genUniqueId(),
				})
				// addToMessages({ role: 'assistant', content: `${object.history} \n ${object.options.join(", ")}` })
				setLoading({ ...loading, options: false, text: false, img: false })
			}
		}
		catch (error) {
			setLoading({ ...loading, options: false, text: false, img: false })
			toast({
				title: "Error",
				variant: 'destructive',
				description: "Ocurrió un error al generar la historia intentalo de nuevo",
			})
			removeSelectedOptions({ ...selectedOptions, [id]: undefined })
			console.error(error);
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
								<p className=" p-3 ">
									{item.content}
								</p>

								{
									imgPublicId && item.promptImage && history.filter(({ type }) => type === "options").length % 2 === 0 &&
									< CldImage
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
			<SkeletonInterface />
		</div>
	);
}
