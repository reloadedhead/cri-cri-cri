import { Ability } from "./character";

export const Skills = [
	"Acrobatics",
	"Animal Handling",
	"Arcana",
	"Athletics",
	"Deception",
	"History",
	"Insight",
	"Intimidation",
	"Investigation",
	"Medicine",
	"Nature",
	"Perception",
	"Performance",
	"Persuasion",
	"Religion",
	"Sleight of Hand",
	"Stealth",
	"Survival",
] as const;

export type Skill = (typeof Skills)[number];

export const skillToAbility: Record<Skill, Ability> = {
	Acrobatics: "dexterity",
	"Animal Handling": "wisdom",
	Arcana: "intelligence",
	Athletics: "strength",
	Deception: "charisma",
	History: "intelligence",
	Insight: "wisdom",
	Intimidation: "charisma",
	Investigation: "intelligence",
	Medicine: "wisdom",
	Nature: "intelligence",
	Perception: "wisdom",
	Performance: "charisma",
	Persuasion: "charisma",
	Religion: "intelligence",
	"Sleight of Hand": "dexterity",
	Stealth: "dexterity",
	Survival: "wisdom",
};
