import { Races } from "@/models/character";

export function useRaceOptions() {
  return Races.map((c) => ({ label: c, value: c }));
}
