"use server";
import { generateObject, generateText, } from "ai";
import { google } from "@ai-sdk/google";
import { mistral } from '@ai-sdk/mistral';
import { z } from "zod";


export const generetaImageDescription = async (image: string) => {
	'use server'
	try {
		const { text: imageDescription } = await generateText({
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: "Describe the image in detail." },
						{
							type: "image",
							image,
						},
					],
				},
			],
			model: google("gemini-1.5-flash-002"),
		});
		const schemaOption = z.object({
			label: z.string().describe("this part is the label of the option that should be small title of the situation for generate a image ej: Dracula Hourse or Zombie Dog"),
			styles: z.string().describe("tailwindcss styles for the option style ej: the history of dracula so you the styles should be like a dracula style like for dracula purple bg"),
		})
		const { object: initialOptions } = await generateObject({
			model: google("gemini-1.5-flash"),
			schema: z.object({
				options: z.array(schemaOption)
			}),
			prompt: `Basándote en la siguiente descripción de la imagen, genera tres posibles opciones de inicio para una historia de terror. Cada opción debe ser única, interesante y basada en los elementos presentes en la descripción.

Descripción de la imagen: ${imageDescription}
en español las opciones
Genera las siguientes opciones:
1. Una opción basada en un género fantástico de terror.
2. Una opción basada en un misterio o suspenso de terror.
3. Una opción basada en una narrativa realista de terror.
`,
		});

		return { options: initialOptions.options }

	}
	catch (error) {
		return { error: true, options: [] }
	}
}

export async function continueHistory(prev: string, select: string) {
	const { object } = await generateObject({
		model: google("gemini-1.5-flash"),
		temperature: 1,
		system: 'que las historia sea coherente, aterradora, y que avance la trama de forma interesante. ',
		schema: z.object({
			history: z
				.string()
				.describe("Continúa la historia con base en los mensajes previos. y la selecion dada"),
			promptImage: z.string().optional().describe('es un descripcion parra genera un image en base a la historia lo ideal es que sea como el entorno'),
			options: z
				.array(z.string())
				.describe("Opciones para continuar la historia."),
		}),
		prompt: `Continuae la historia de terror teniendo en cuenta los siguientes mensajes previos:
				${prev}
				Asegúrate de que la continuación sea coherente, aterradora, y que avance la trama de forma interesante.
				Genera	yield dos o tres opciones para que el usuario decidacontinuar.
			`
	})
	return { object };
}