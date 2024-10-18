import { google } from "@ai-sdk/google";
import { generateObject, generateText, streamObject } from "ai";
import { z } from "zod";
const generetaImageDescription = async (image: string) => {
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
		model: google("gemini-1.5-flash"),
	});
	// prompt: z.string().describe('this part is the prompt of the option that shoulb be a short descripcion of the situation for generate a image'),
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

Genera las siguientes opciones:
1. Una opción basada en un género fantástico de terror.
2. Una opción basada en un misterio o suspenso de terror.
3. Una opción basada en una narrativa realista de terror.
`,
	});

	return { option: initialOptions.options, imageDescription };
}

// export async function continueStory(prev: []) {
// 	"use server";
// 	const { object } = await streamObject({
// 		model: google("gemini-1.5-flash"),
// 		schema: z.object({
// 			history: z
// 				.string()
// 				.describe("Continúa la historia con base en los mensajes previos. y la selecion dada"),
// 			promptImage: z.string().optional(),
// 			options: z
// 				.array(z.string())
// 				.describe("Opciones para continuar la historia."),
// 		}),
// 		// messages: prev,
// 		prompt: `Continúa la historia de terror teniendo en cuenta los siguientes mensajes previos:


// 				Asegúrate de que la continuación sea coherente, aterradora, y que avance la trama de forma interesante.
// 				Genera también dos o tres opciones para que el usuario decida cómo continuar.
// `,
// 	});
// 	return object;
// }


const img = await generetaImageDescription('https://res.cloudinary.com/dhcobeldd/image/upload/v1729181225/gsn7onorwzrnimfg7tbh.jpg')
console.log(img)