import ImageUpload from "@/components/ImageUpload";

export default async function Home() {
	return (
		<main className="h-screen grid place-content-center">
			<ImageUpload />
		</main>
	);
}
