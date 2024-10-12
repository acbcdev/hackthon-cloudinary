"use client";

// import {
// 	CldUploadWidget,
// 	type CloudinaryUploadWidgetInfo,
// } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = forwardRef<HTMLInputElement>((_, ref) => {
	const { uploadImg } = useStore();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const imageUrl = URL.createObjectURL(file);
			uploadImg({
				secure_url: "",
				public_id: "",
				local: imageUrl,
			});
		}
	};
	return (
		<div className="flex items-center space-x-2">
			<Input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				id="image-upload"
				ref={ref}
			/>
			<Button
				onClick={() => document.getElementById("image-upload")?.click()}
				variant="outline"
			>
				{selectedFile ? "Change Image" : "Upload Image (Ctrl+I)"}
			</Button>
			{selectedFile && <span className="text-sm">{selectedFile.name}</span>}
		</div>
	);
});
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
