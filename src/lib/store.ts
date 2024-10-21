import type { CoreAssistantMessage, CoreSystemMessage, CoreToolMessage, CoreUserMessage } from "ai";
import { create } from "zustand";

// type Narrative = {
// 	id: number;
// 	image?: string;
// 	promptImage: string;
// 	narrative: string;
// 	options: Options[];
// };
type ChatItem = {
	type: "text" | "options";
	id: number;
	content?: string;
	options?: string[];
	promptImage?: string;
	img?: {
		local?: string;
		secure_url?: string;
		public_id?: string;
	};
};

type States = {
	img: { public_id: string; secure_url: string; local: string, description: string };
	history: ChatItem[];
	loading: {
		loading: boolean;
		img: boolean;
		options: boolean;
		text: boolean;
	}

	messages: Array<CoreSystemMessage | CoreUserMessage | CoreAssistantMessage | CoreToolMessage>,
	maxHistory: number;
	selectedOptions: Record<string, string>;
};
type Actions = {
	uploadImg: (img: States["img"]) => void;
	addToHistory: (narrative: ChatItem) => void;
	updateHistory: (narrative: ChatItem[]) => void;
	addToSelectedOptions: (id: number, selection: string) => void;
	removeSelectedOptions: (id: States["selectedOptions"]) => void;
	addToMessages: (message: CoreSystemMessage | CoreUserMessage | CoreAssistantMessage | CoreToolMessage) => void;
	setLoading: (loading: States['loading']) => void;

};
export const useStore = create<States & Actions>((set) => ({
	img: { public_id: "", secure_url: "", local: "", description: "" },
	maxHistory: 5,
	loading: {
		loading: false,
		img: false,
		options: false,
		text: false,
	},

	messages: [{ role: "system", content: "que las historia sea coherente, aterradora, y que avance la trama de forma interesante" }],
	setLoading: (loading) => set((state) => ({
		...state,
		loading,
	})),
	addToMessages: (message) => set((state) => ({ messages: [...state.messages, message] })),
	history: [
		{
			type: "text",
			content: "¡Bienvenido! Por favor, elige una opción para comenzar:",
			id: 2,
		},
	],
	selectedOptions: {},
	addToSelectedOptions: (id, selection) =>
		set((state) => ({
			selectedOptions: { ...state.selectedOptions, [id]: selection },
		})),
	removeSelectedOptions: (newSelected) =>
		set(({
			selectedOptions: newSelected,
		})),
	uploadImg: (img) => set({ img }),
	addToHistory: (narrative) =>
		set((state) => ({ history: [...state.history, narrative] })),
	updateHistory: (narrative) => set({ history: narrative }),
}));
