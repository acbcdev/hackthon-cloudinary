import StoryNarrative from "./StoryNarrative";

export default function DynamicInterface({
	img,
	options,
	imgDescription
}: { img: string; options: string[], imgDescription: string }) {
	return (
		<>
			<main className="min-h-screen grid place-content-center z-10">
				<StoryNarrative img={img} options={options} imgDescription={imgDescription} />
			</main>
		</>
	);
}
