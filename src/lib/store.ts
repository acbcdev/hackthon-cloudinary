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
	img: { public_id: string; secure_url: string; local: string };
	history: ChatItem[];
	maxHistory: number;
	selectedOptions: Record<string, string>;
};
type Actions = {
	uploadImg: (img: States["img"]) => void;
	addToHistory: (narrative: ChatItem) => void;
	updateHistory: (narrative: ChatItem[]) => void;
	addToSelectedOptions: (id: number, selection: string) => void;
};
export const useStore = create<States & Actions>((set) => ({
	img: { public_id: "", secure_url: "", local: "" },
	maxHistory: 5,
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
	uploadImg: (img) => set({ img }),
	addToHistory: (narrative) =>
		set((state) => ({ history: [...state.history, narrative] })),
	updateHistory: (narrative) => set({ history: narrative }),
}));
