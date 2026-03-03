import { Classes } from "@/models/character";

export function useClassOptions() {
  return Classes.map((c) => ({ label: c, value: c }));
}
