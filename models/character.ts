import z from "zod";

export const Abilities = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
] as const;
export type Ability = (typeof Abilities)[number];

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

export type Character = {
	id: string;
	name: string;
	class: Class;
	race: Race;
	level: number;
	hp: HitPoints;
	ac: number;
	proficiency: number;
	speed: number;
	weapons: Weapon[];
	armor: Armor[];
} & Record<Ability, number>;

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

export const Races = [
	"Human",
	"Elf",
	"Dwarf",
	"Halfling",
	"Dragonborn",
	"Gnome",
	"Tiefling",
	"Half-Elf",
	"Half-Orc",
	"Aasimar",
	"Tabaxi",
	"Tribal",
	"Lizardfolk",
	"Genasi",
	"Firbolg",
	"Warforged",
] as const;

export type Race = (typeof Races)[number];
