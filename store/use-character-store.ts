"use client";

import { indexedDBStorage } from "@/lib/storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const Abilities = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
] as const;
export type Ability = (typeof Abilities)[number];

export interface AbilityScore {
  score: number;
  modifier: number;
}

export interface AbilityScores {
  Strength: AbilityScore;
  Dexterity: AbilityScore;
  Constitution: AbilityScore;
  Intelligence: AbilityScore;
  Wisdom: AbilityScore;
  Charisma: AbilityScore;
}

export interface HitPoints {
  current: number;
  max: number;
}

export interface Weapon {
  name: string;
  damage: string;
  type: string;
  bonus: number;
}

export interface Armor {
  name: string;
  ac?: number;
  acBonus?: number;
  type?: string;
}

export interface Skill {
  name: string;
  modifier: number;
  proficient: boolean;
}

export interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  hp: HitPoints;
  ac: number;
  initiative: number;
  proficiency: number;
  speed: number;
  abilities: AbilityScores;
  weapons: Weapon[];
  armor: Armor[];
  skills: Skill[];
}

type CharacterState = {
  characters: Character[];
  get: (id: string) => Character | null;
  add: (character: Omit<Character, "id">) => Character;
  put: (character: Partial<Character> & { id: string }) => void;
  remove: (id: string) => void;
  clear: () => void;

  /**
   * Domain-specific.
   */
  setHitPoints: (id: string, value: number) => void;
  rest: (id: string, type: "short" | "long") => void;

  /**
   * Hydration stuff.
   */
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      characters: [],
      get: (id) => get().characters.find((c) => c.id === id) ?? null,
      add: (character) => {
        const created: Character = { ...character, id: crypto.randomUUID() };

        set({ characters: [...get().characters, created] });

        return created;
      },
      put: (character) =>
        set({
          characters: get().characters.map((c) =>
            c.id === character.id ? { ...c, ...character } : c,
          ),
        }),
      clear: () => set({ characters: [] }),
      remove: (id) =>
        set({
          characters: get().characters.filter((c) => c.id !== id),
        }),

      setHitPoints: (id, value) => {
        set({
          characters: get().characters.map((c) => {
            if (c.id === id) {
              if (value > c.hp.max) {
                return { ...c, hp: { ...c.hp, current: c.hp.max } };
              }
              if (value < 0) {
                return { ...c, hp: { ...c.hp, current: 0 } };
              }
              return { ...c, hp: { ...c.hp, current: value } };
            }

            return c;
          }),
        });
      },
      rest: (id, type) =>
        set({
          characters: get().characters.map((c) =>
            c.id === id
              ? {
                  ...c,
                  hp: {
                    ...c.hp,
                    current: type === "short" ? c.hp.max / 2 : c.hp.max,
                  },
                }
              : c,
          ),
        }),

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "character-store",
      storage: createJSONStorage(() => indexedDBStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
