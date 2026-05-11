import { create } from "zustand";
import { Product } from "@/data/products";

export type SetCategory = "anillos" | "collares" | "pulseras" | "aros";

export interface SetSelection {
  anillos: Product | null;
  collares: Product | null;
  pulseras: Product | null;
  aros: Product | null;
}

interface SetStore {
  // Current active category being configured
  activeCategory: SetCategory;
  // Selected product per category
  selection: SetSelection;
  // Step index for the stepper UI (0-3)
  activeStep: number;

  setActiveCategory: (category: SetCategory) => void;
  selectProduct: (category: SetCategory, product: Product) => void;
  removeProduct: (category: SetCategory) => void;
  clearSet: () => void;
  applyPredefinedSet: (products: Product[]) => void;
  goToStep: (step: number) => void;

  // Derived getters
  selectedCount: () => number;
  subtotalOriginal: () => number;
  discountPercent: () => number;
  discountAmount: () => number;
  subtotalWithDiscount: () => number;
  selectedProducts: () => Product[];
}

const STEP_CATEGORIES: SetCategory[] = ["collares", "anillos", "aros", "pulseras"];

export const useSetStore = create<SetStore>()((set, get) => ({
  activeCategory: "collares",
  activeStep: 0,
  selection: {
    anillos: null,
    collares: null,
    pulseras: null,
    aros: null,
  },

  setActiveCategory: (category) =>
    set({
      activeCategory: category,
      activeStep: STEP_CATEGORIES.indexOf(category),
    }),

  selectProduct: (category, product) =>
    set((state) => ({
      selection: { ...state.selection, [category]: product },
    })),

  removeProduct: (category) =>
    set((state) => ({
      selection: { ...state.selection, [category]: null },
    })),

  clearSet: () =>
    set({
      selection: { anillos: null, collares: null, pulseras: null, aros: null },
      activeCategory: "collares",
      activeStep: 0,
    }),

  applyPredefinedSet: (products) =>
    set(() => {
      const newSelection: SetSelection = { anillos: null, collares: null, pulseras: null, aros: null };
      products.forEach((p) => {
        newSelection[p.category] = p;
      });
      return { selection: newSelection };
    }),

  goToStep: (step) => {
    const category = STEP_CATEGORIES[step] ?? "collares";
    set({ activeStep: step, activeCategory: category });
  },

  selectedCount: () => {
    const { selection } = get();
    return Object.values(selection).filter(Boolean).length;
  },

  subtotalOriginal: () => {
    const { selection } = get();
    return Object.values(selection)
      .filter((p): p is Product => p !== null)
      .reduce((acc, p) => acc + p.price, 0);
  },

  discountPercent: () => {
    const count = get().selectedCount();
    if (count >= 4) return 20;
    if (count >= 3) return 15;
    if (count >= 2) return 10;
    return 0;
  },

  discountAmount: () => {
    const subtotal = get().subtotalOriginal();
    const pct = get().discountPercent();
    return Math.round(subtotal * (pct / 100));
  },

  subtotalWithDiscount: () => {
    return get().subtotalOriginal() - get().discountAmount();
  },

  selectedProducts: () => {
    const { selection } = get();
    return Object.values(selection).filter((p): p is Product => p !== null);
  },
}));

export const SET_STEPS: { category: SetCategory; label: string; emoji: string; description: string }[] = [
  { category: "collares", label: "Collar", emoji: "✦", description: "La pieza central de tu look" },
  { category: "anillos", label: "Anillo", emoji: "◇", description: "Elige tu anillo estrella" },
  { category: "aros", label: "Aros", emoji: "○", description: "Completa con aros elegantes" },
  { category: "pulseras", label: "Pulsera", emoji: "—", description: "El toque final en la muñeca" },
];
