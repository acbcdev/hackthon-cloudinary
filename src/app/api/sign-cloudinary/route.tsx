import { v2 as cloudinary } from "cloudinary";
import config from "@/config";
console.log(config);
cloudinary.config({
	cloud_name: config.public.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_API_KEY,
	api_secret: config.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	const body = await request.json();
	const { paramsToSign } = body;

	const signature = cloudinary.utils.api_sign_request(
		paramsToSign,
		config.CLOUDINARY_API_SECRET,
	);

	return Response.json({ signature });
}
