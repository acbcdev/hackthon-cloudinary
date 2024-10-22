"use client";

import {
	CldUploadWidget,
	type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useRef } from "react";
// import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ImageUpload = () => {
	const { uploadImg } = useStore();
	const router = useRouter();
	const { toast } = useToast()
	// const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	useHotkeys("ctrl+i", () => {
		btnRef.current?.click();
	});

	function uploadedImage(img: CloudinaryUploadWidgetInfo | string) {
		if (typeof img === "string") return;
		router.push(`history?img=${img.public_id}`);
		uploadImg({
			public_id: img.public_id,
			secure_url: img.secure_url,
			local: "",
			description: ''
		});
	}
	return (
		<CldUploadWidget
			options={{
				sources: ["local"],
				multiple: false,
				maxFiles: 1,
			}}
			onSuccess={(result) => {
				uploadedImage(result?.info ?? "");
			}}
			onQueuesEnd={() => {
				document.body.style.overflow = "auto";
			}}
			onUploadAdded={() => console.log("Upload added")}
			uploadPreset="Hackthon"
		>
			{({ open }) => {
				return (
					<Button
						onClick={() => {
							try {
								if (open) open();
							}
							catch {
								toast({
									title: "Error",
									description: "Try Again",
									duration: 3000,
									variant: "destructive",
								})
							}
						}}
						className="py-8 px-10 w-fit mx-auto "
						variant={"secondary"}
						ref={btnRef}
					>
						Subir Image <Kbd>Ctrl</Kbd>+<Kbd>i</Kbd>
					</Button>
				);
			}}
		</CldUploadWidget>
	);
	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files?.[0];
	// 	if (file) {
	// 		setSelectedFile(file);
	// 		const imageUrl = URL.createObjectURL(file);
	// 		uploadImg({
	// 			secure_url: "",
	// 			public_id: "",
	// 			local: imageUrl,
	// 		});
	// 	}
	// };
	// return (
	// 	<div className="grid place-content-center space-x-2">
	// 		<Input
	// 			type="file"
	// 			onKeyDown={(e) => {
	// 				if (e.key === "i" && (e.ctrlKey || e.metaKey)) {
	// 					e.preventDefault();
	// 					document.getElementById("image-upload")?.click();
	// 				}
	// 			}}
	// 			accept="image/*"
	// 			onChange={handleFileChange}
	// 			className="hidden"
	// 			id="image-upload"
	// 			ref={imgRef}
	// 		/>
	// 		<Button
	// 			onClick={() => document.getElementById("image-upload")?.click()}
	// 			className="py-8 px-10  "
	// 			variant={"secondary"}
	// 		>
	// 			Upload Image <Kbd>Ctrl</Kbd>+<Kbd>i</Kbd>
	// 		</Button>
	// 		{selectedFile && <span className="text-sm">{selectedFile.name}</span>}
	// 	</div>
	// );
};
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
// function uploadedImage(img: CloudinaryUploadWidgetInfo | string) {
// 	if (typeof img === "string") return;
// 	uploadImg({ secure_url: img.secure_url, public_id: img.public_id });
// }
// return (
// 	<CldUploadWidget
// 		options={{
// 			sources: ["local", "unsplash"],
// 			multiple: false,
// 			maxFiles: 1,
// 		}}
// 		onSuccess={(result) => {
// 			console.log(result);
// 			uploadedImage(result?.info ?? "");
// 		}}
// 		onQueuesEnd={(_, { widget }) => {
// 			widget.close();
// 			document.body.style.overflow = "auto";
// 		}}
// 		onUploadAdded={() => console.log("Upload added")}
// 		uploadPreset="Hackthon"
// 	>
// 		{({ open }) => {
// 			return <Button onClick={() => open()}>Upload an Image</Button>;
// 		}}
// 	</CldUploadWidget>
// );
