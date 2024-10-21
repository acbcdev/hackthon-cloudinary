import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
	const imgs = [
		{
			id: 'nxox7ztfg9culj5tnjvd',
			url: 'https://res.cloudinary.com/dhcobeldd/image/upload/c_limit,w_500/f_auto/q_auto/v1/nxox7ztfg9culj5tnjvd?_a=BAVCyODW0'
		},
		{
			id: 'rlm9p6ewbrp5lecfjwha',
			url: 'https://res.cloudinary.com/dhcobeldd/image/upload/v1729196385/rlm9p6ewbrp5lecfjwha.jpg'
		},
		{
			id: 'nzgcjmzdazu7qhhrlzbb',
			url: 'https://res.cloudinary.com/dhcobeldd/image/upload/c_limit,w_500/f_auto/q_auto/v1/nzgcjmzdazu7qhhrlzbb?_a=BAVCyODW0'
		}
	]

	return (
		<main className="h-screen grid place-content-center">
			<h1 translate="no" className="font-midnight text-8xl text-center mb-20">
				Spooky Histories
			</h1>
			<ImageUpload />
			<h2 className="my-2 text-center ">O usa estas Imágenes</h2>
			<section className="flex gap-2 p-2">
				{imgs.map((img) => (
					<Link href={`history?img=${img.id}`} key={img.id}>
						<Image
							src={img.url}
							alt="base Images"
							className="rounded-xl"
							width={200}
							height={200}
						/>
					</Link>

				))}
			</section>
		</main>
	);
}
