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
  name: string;
  class: Class;
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

export const Classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

export type Class = (typeof Classes)[number];
