"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClassOptions } from "@/hooks/use-class-options";
import { useRaceOptions } from "@/hooks/use-race-options";
import { useCharacterStore } from "@/store/use-character-store";
import { useRouter } from "next/navigation";
import { SubmitEvent, useRef, useState } from "react";
import { z } from "zod";
import { Abilities, Ability, Classes, Races } from "../models/character";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface CreateCharacterModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function CreateCharacterModal({
	open,
	onOpenChange,
}: CreateCharacterModalProps) {
	const router = useRouter();
	const { add } = useCharacterStore();
	const classOptions = useClassOptions();
	const raceOptions = useRaceOptions();
	const formRef = useRef<HTMLFormElement>(null);
	const [abilities, setAbilities] = useState<Record<Ability, number>>({
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	});

	const getModifierOf = (ability: Ability) => {
		const value = Number(abilities?.[ability]);

		if (Number.isInteger(value)) {
			return Math.floor((value - 10) / 2);
		}

		return null;
	};

	const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.stopPropagation();
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const parsed = z
			.object({
				name: z.string(),
				level: z.coerce.number().min(1).max(20),
				race: z.enum(Races),
				class: z.enum(Classes),
				ac: z.coerce.number(),
				maxHp: z.coerce.number(),
				proficiency: z.coerce.number(),
				speed: z.coerce.number(),
				strength: z.coerce.number(),
				dexterity: z.coerce.number(),
				constitution: z.coerce.number(),
				charisma: z.coerce.number(),
				wisdom: z.coerce.number(),
				intelligence: z.coerce.number(),
			})
			.safeParse(Object.fromEntries(formData.entries()));

		if (parsed.success) {
			const { id } = add(parsed.data);

			router.push(`/characters/${id}/sheet`);
		} else {
			console.error(parsed.error);
			alert(
				"There's some error in your form and I had no time to build a nicer UI. 😔",
			);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						Create New Character
					</DialogTitle>
					<DialogDescription>
						Fill in the basic details for your new adventurer
					</DialogDescription>
				</DialogHeader>

				<form ref={formRef} onSubmit={onSubmit} className="space-y-6">
					{/* Basic Info */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name *</Label>
								<Input
									id="name"
									name="name"
									placeholder="Thorin Ironforge"
									required
									min={1}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="race">Race *</Label>
								<Select name="race" required>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										{raceOptions.map((race) => (
											<SelectItem
												key={race.value}
												value={race.value}
											>
												{race.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="class">Class *</Label>
								<Select name="class" required>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										{classOptions.map((option) => (
											<SelectItem
												value={option.value}
												key={option.value}
											>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="level">Level</Label>
								<Input
									id="level"
									name="level"
									type="number"
									min="1"
									max="20"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="maxHp">Max HP</Label>
								<Input
									required
									id="maxHp"
									name="maxHp"
									type="number"
									min="1"
								/>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="ac">AC</Label>
								<Input
									required
									id="ac"
									name="ac"
									type="number"
									min="1"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="proficiency">Proficiency</Label>
								<Input
									required
									id="proficiency"
									name="proficiency"
									type="number"
									min="0"
									max="6"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="speed">Speed</Label>
								<Input
									required
									name="speed"
									id="speed"
									type="number"
									min="0"
								/>
							</div>
						</div>
					</div>

					{/* Ability Scores */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Ability Scores</h3>
						<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
							{Abilities.map((ability) => (
								<div key={ability} className="space-y-2">
									<Label
										htmlFor={ability}
										className="text-xs uppercase"
									>
										{ability.substring(0, 3)}
									</Label>
									<Input
										id={ability}
										name={ability}
										required
										type="number"
										min="1"
										max="30"
										className="text-center"
										defaultValue={10}
										onChange={(event) =>
											setAbilities((old) => ({
												...old,
												[ability]: Number(
													event.currentTarget?.value ?? 0,
												),
											}))
										}
									/>
									<div className="text-xs text-center text-slate-600 dark:text-slate-400">
										{getModifierOf(ability)}
									</div>
								</div>
							))}
						</div>
					</div>

					<DialogFooter>
						<Button type="button" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
