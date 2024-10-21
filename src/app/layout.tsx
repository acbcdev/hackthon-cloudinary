import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const midNight = localFont({
	src: "./fonts/Midnight.woff2",
	variable: "--font-midnight",
	weight: "400", // Ajusta según los pesos disponibles en la fuente
	style: "normal", // Ajusta si es cursiva u otro estilo
	display: "swap",
	preload: true
})

export const metadata: Metadata = {
	title: "Spooky Histories",
	description: 'Explora el Creador de Historias de Terror impulsado por imágenes. Transforma cualquier imagen en un relato aterrador con nuestra herramienta innovadora, diseñada para el Hackathon de Cloudinary. ¡Sumérgete en el misterio y el horror!'
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${midNight.variable} antialiased dark min-h-screen overflow-y-auto bg-background`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
