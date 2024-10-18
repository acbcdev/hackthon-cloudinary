"use client";
import Demo from "@/components/Demo";
import ImageUpload from "@/components/ImageUpload";
import { useStore } from "@/lib/store";
export default function page() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { img } = useStore();
	return (
		<div className="min-h-screen p-4 grid place-content-center">
			{img.local ? <Demo /> : <ImageUpload />}
		</div>
	);
}
