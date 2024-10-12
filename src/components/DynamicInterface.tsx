"use client";
import ImageUpload from "@/components/ImageUpload";
import { useStore } from "@/lib/store";
import StoryNarrative from "./StoryNarrative";

export default function DynamicInterface() {
	const { img } = useStore();

	return (
		<>
			<main className="min-h-screen grid place-content-center z-10">
				{img.local ? <StoryNarrative /> : <ImageUpload />}
			</main>
		</>
	);
}
