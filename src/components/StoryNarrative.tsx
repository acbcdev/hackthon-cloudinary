'use client';
import Image from "next/image";
import Interface from "@/components/Interface";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function StoryNarrative({
	img,
	options,
}: { img: string; options: string[] }) {
	const router = useRouter();
	const { toast } = useToast();
	return (
		<>
			<section className="grid place-content-center gap-y-2 my-4 p-4">
				<Image
					src={img}
					className=" rounded-3xl mx-auto"
					alt="uploaded from the user"
					// fill
					onError={() => {
						router.push('/')
						toast({
							title: "Error",
							variant: 'destructive',
							description: "Could not load image",
						});
					}}
					width={300}
					height={300}
				// placeholder="blur"
				/>
				<Interface options={options} />
			</section>
		</>
	);
}
