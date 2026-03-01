import { create } from "zustand";
import { Character } from "@/models/character";

interface CharacterListItem {
  id: string;
  name: string;
  class: string;
  level: number;
  lastModified: string;
}

interface CharacterStore {
  character: Character | null;
  characters: CharacterListItem[];
  currentCharacterId: string | null;
  isLoading: boolean;
  error: string | null;

  // Character operations
  loadCharacter: (id: string) => Promise<void>;
  saveCharacter: (character: Character) => Promise<void>;
  createCharacter: (character: Character) => Promise<string>;
  deleteCharacter: (id: string) => Promise<void>;
  listCharacters: () => Promise<void>;

  // Character mutations
  updateHP: (current: number) => void;
  adjustHP: (amount: number) => void;
  resetHP: () => void;

  // Import/Export
  exportCharacter: () => void;
  importCharacter: (data: Character) => Promise<void>;

  // UI helpers
  setError: (error: string | null) => void;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("DnDCharacterDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("characters")) {
        const store = db.createObjectStore("characters", { keyPath: "id" });
        store.createIndex("lastModified", "lastModified", { unique: false });
      }
    };
  });
};

export const useCharacter = create<CharacterStore>((set, get) => ({
  character: null,
  characters: [],
  currentCharacterId: null,
  isLoading: false,
  error: null,

  loadCharacter: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const db = await openDB();
      const transaction = db.transaction(["characters"], "readonly");
      const store = transaction.objectStore("characters");

      const request = store.get(id);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          if (request.result) {
            set({
              character: request.result.data,
              currentCharacterId: id,
              isLoading: false,
            });
            resolve();
          } else {
            set({ error: "Character not found", isLoading: false });
            reject(new Error("Character not found"));
          }
        };
        request.onerror = () => {
          set({ error: "Failed to load character", isLoading: false });
          reject(request.error);
        };
      });
    } catch (error) {
      set({ error: "Database error", isLoading: false });
      throw error;
    }
  },

  saveCharacter: async (character: Character) => {
    const { currentCharacterId } = get();
    if (!currentCharacterId) {
      throw new Error("No character ID set");
    }

    try {
      const db = await openDB();
      const transaction = db.transaction(["characters"], "readwrite");
      const store = transaction.objectStore("characters");

      const data = {
        id: currentCharacterId,
        data: character,
        name: character.name,
        class: character.class,
        level: character.level,
        lastModified: new Date().toISOString(),
      };

      store.put(data);

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          set({ character });
          resolve();
        };
        transaction.onerror = () => {
          set({ error: "Failed to save character" });
          reject(transaction.error);
        };
      });
    } catch (error) {
      set({ error: "Database error" });
      throw error;
    }
  },

  createCharacter: async (character: Character) => {
    try {
      const id = `character_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const db = await openDB();
      const transaction = db.transaction(["characters"], "readwrite");
      const store = transaction.objectStore("characters");

      const data = {
        id,
        data: character,
        name: character.name,
        class: character.class,
        level: character.level,
        lastModified: new Date().toISOString(),
      };

      store.add(data);

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          set({ character, currentCharacterId: id });
          get().listCharacters();
          resolve(id);
        };
        transaction.onerror = () => {
          set({ error: "Failed to create character" });
          reject(transaction.error);
        };
      });
    } catch (error) {
      set({ error: "Database error" });
      throw error;
    }
  },

  deleteCharacter: async (id: string) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["characters"], "readwrite");
      const store = transaction.objectStore("characters");

      store.delete(id);

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          const { currentCharacterId } = get();
          if (currentCharacterId === id) {
            set({ character: null, currentCharacterId: null });
          }
          get().listCharacters();
          resolve();
        };
        transaction.onerror = () => {
          set({ error: "Failed to delete character" });
          reject(transaction.error);
        };
      });
    } catch (error) {
      set({ error: "Database error" });
      throw error;
    }
  },

  listCharacters: async () => {
    set({ isLoading: true, error: null });
    try {
      const db = await openDB();
      const transaction = db.transaction(["characters"], "readonly");
      const store = transaction.objectStore("characters");
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const characters = request.result.map((item: CharacterListItem) => ({
            id: item.id,
            name: item.name,
            class: item.class,
            level: item.level,
            lastModified: item.lastModified,
          }));
          set({ characters, isLoading: false });
          resolve();
        };
        request.onerror = () => {
          set({ error: "Failed to load characters", isLoading: false });
          reject(request.error);
        };
      });
    } catch (error) {
      set({ error: "Database error", isLoading: false });
      throw error;
    }
  },

  updateHP: (current: number) => {
    const { character } = get();
    if (!character) return;

    const newCharacter = {
      ...character,
      hp: {
        ...character.hp,
        current: Math.max(0, Math.min(character.hp.max, current)),
      },
    };

    set({ character: newCharacter });
    get().saveCharacter(newCharacter);
  },

  adjustHP: (amount: number) => {
    const { character } = get();
    if (!character) return;

    const newCurrent = character.hp.current + amount;
    get().updateHP(newCurrent);
  },

  resetHP: () => {
    const { character } = get();
    if (!character) return;

    get().updateHP(character.hp.max);
  },

  exportCharacter: () => {
    const { character } = get();
    if (!character) return;

    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${character.name.replace(/\s+/g, "_")}_character.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  importCharacter: async (data: Character) => {
    try {
      await get().createCharacter(data);
      return Promise.resolve();
    } catch (error) {
      set({ error: "Failed to import character" });
      throw error;
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
