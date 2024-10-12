import { create } from "zustand";
type Options = {
	id: number;
	label: string;
	prompt: string;
	styles: string;
};
type Narrative = {
	id: number;
	image: string;
	promptImage: string;
	narrative: string;
	options: Options[];
};

type States = {
	img: { public_id: string; secure_url: string; local: string };
	history: Narrative[];
};
type Actions = {
	uploadImg: (img: States["img"]) => void;
	addToHistory: (narrative: Narrative) => void;
};
export const useStore = create<States & Actions>((set) => ({
	img: { public_id: "", secure_url: "", local: "" },
	history: [],
	uploadImg: (img) => set({ img }),
	addToHistory: (narrative) =>
		set((state) => ({ history: [...state.history, narrative] })),
}));
