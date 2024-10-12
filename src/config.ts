export const config = {
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? "",
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? "",
	public: {
		CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
	},
};

export default config;
