import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Función para generar un ID único de tipo número
export function genUniqueId(): number {
	return Date.now() + Math.floor(Math.random() * 10000);
}
