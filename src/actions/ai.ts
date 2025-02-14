"use server";
import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
// import type {
//   CoreAssistantMessage,
//   CoreMessage,
//   CoreSystemMessage,
//   CoreToolMessage,
//   CoreUserMessage,
//   Message,
// } from "ai";
import type { States } from "@/lib/store";

export const generetaImageDescription = async (image: string) => {
  "use server";
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
      model: google("gemini-2.0-flash-001"),
    });
    const schemaOption = z.object({
      label: z
        .string()
        .describe(
          "this part is the label of the option that should be small title of the situation for generate a image ej: Dracula Hourse or Zombie Dog"
        ),
      styles: z
        .string()
        .describe(
          "tailwindcss styles for the option style ej: the history of dracula so you the styles should be like a dracula style like for dracula purple bg"
        ),
    });
    const { object: initialOptions } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: z.object({
        options: z.array(schemaOption),
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

    return {
      options: initialOptions.options,
      imgDescription: imageDescription,
    };
  } catch {
    return { error: true, options: [] };
  }
};

export async function continueHistory({
  prev,
  select,
  imageDescription,
}: {
  prev: string;
  select: string;
  imageDescription: string;
}) {
  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    temperature: 1,
    system: `<system_prompt>
  <role>
    ERES UN NARRADOR EXPERTO EN HISTORIAS DE TERROR, CAPAZ DE CREAR RELATOS INQUIETANTES, ATMOSFÉRICOS Y COHERENTES. TU MISIÓN ES GENERAR UNA CONTINUACIÓN QUE MANTENGA LA TENSIÓN, EL MISTERIO Y LA INMERSIÓN DEL LECTOR.
  </role>
  
  <instructions>
    <requirement>LA HISTORIA DEBE SER COHERENTE Y AUMENTAR LA INQUIETUD DEL LECTOR</requirement>
    <requirement>UTILIZA UN LENGUAJE DESCRIPTIVO PARA CREAR UNA ATMÓSFERA OPRESIVA</requirement>
    <requirement>LOS EVENTOS DEBEN PROGRESAR DE FORMA ORGÁNICA Y MANTENER LA INTRIGA</requirement>
    <requirement>SELECCIONA OPCIONES DE CONTINUACIÓN QUE PROVOQUEN TENSIÓN Y TOMAS DE DECISIONES DIFÍCILES</requirement>
  </instructions>

  <output_format>
    <history>Continuación de la historia basada en mensajes previos y la selección dada (máximo 25 caracteres).</history>
    <promptImage>Descripción para generar una imagen basada en la historia, enfocándose en el entorno aterrador max 3 palabras.</promptImage>
    <options>Lista de opciones para continuar la historia, manteniendo la tensión narrativa.</options>
  </output_format>
</system_prompt>`,
    schema: z.object({
      history: z
        .string()
        .describe(
          "Continuación de la historia basada en mensajes previos y la selección dada (máximo 25 caracteres)."
        ),
      promptImage: z
        .string()
        .optional()
        .describe(
          "Descripción para generar una imagen basada en la historia, enfocándose en el entorno aterrador maximo 3 palabras trata de ser simple."
        ),
      options: z
        .array(
          z
            .string()
            .describe(
              "Lista de opciones para continuar la historia, manteniendo la tensión narrativa."
            )
        )
        .describe("Opciones para continuar la historia."),
    }),
    prompt: `
				esta es la descripcion de la image 
        <Image_Description>
          ${imageDescription}
        </Image_Description>

				Continuae la historia de terror teniendo en cuenta los siguientes mensajes previos:
        
        <previous_messages>
			  	${prev}
        </previous_messages>

        <user_selection>
				  el usario seleciono la opcion: ${select}
        </user_selection>
				Asegúrate de que la continuación sea coherente, aterradora, y que avance la trama de forma interesante.
				Genera	yield dos o tres opciones para que el usuario decidacontinuar.
			`,
  });
  return { object };
}
export async function continueHistoryV2(messages: States["messages"]) {
  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    temperature: 1,
    messages,
    system: `<system_prompt>
  <role>
    ERES UN NARRADOR EXPERTO EN HISTORIAS DE TERROR, CAPAZ DE CREAR RELATOS INQUIETANTES, ATMOSFÉRICOS Y COHERENTES. TU MISIÓN ES GENERAR UNA CONTINUACIÓN QUE MANTENGA LA TENSIÓN, EL MISTERIO Y LA INMERSIÓN DEL LECTOR.
  </role>
  
  <instructions>
    <requirement>LA HISTORIA DEBE SER COHERENTE Y AUMENTAR LA INQUIETUD DEL LECTOR</requirement>
    <requirement>UTILIZA UN LENGUAJE DESCRIPTIVO PARA CREAR UNA ATMÓSFERA OPRESIVA</requirement>
    <requirement>LOS EVENTOS DEBEN PROGRESAR DE FORMA ORGÁNICA Y MANTENER LA INTRIGA</requirement>
    <requirement>SELECCIONA OPCIONES DE CONTINUACIÓN QUE PROVOQUEN TENSIÓN Y TOMAS DE DECISIONES DIFÍCILES</requirement>
  </instructions>

  <output_format>
    <history>Continuación de la historia basada en mensajes previos y la selección dada (máximo 25 caracteres).</history>
    <promptImage>Descripción para generar una imagen basada en la historia, enfocándose en el entorno aterrador.</promptImage>
    <options>Lista de opciones para continuar la historia, manteniendo la tensión narrativa.</options>
  </output_format>
</system_prompt>
		`,
    schema: z.object({
      history: z
        .string()
        .describe(
          "Continuación de la historia basada en mensajes previos y la selección dada (máximo 25 caracteres)."
        ),
      promptImage: z
        .string()
        .optional()
        .describe(
          "Descripción para generar una imagen basada en la historia, enfocándose en el entorno aterrador."
        ),
      options: z
        .array(z.string())
        .describe(
          "Lista de opciones para continuar la historia, manteniendo la tensión narrativa."
        ),
    }),
  });
  return { object };
}
