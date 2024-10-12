"use server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
// label: "El preso zombie ",
// 			prompt: "zombies there ",
// 			styles: "bg-red-500 hover:bg-red-500",
// 			id: 1,

export async function generteInitOptions() {
	"use server";
	const { object } = await generateObject({
		model: google("gemini-1.5-flash"),
		schema: z.object({
			option1: z.object({
				label: z.string(),
				prompt: z.string(),
				styles: z.string(),
			}),
			option2: z.object({
				label: z.string(),
				prompt: z.string(),
				styles: z.string(),
			}),
		}),
		prompt: `
      el L
    `,
	});
	return object;
}
