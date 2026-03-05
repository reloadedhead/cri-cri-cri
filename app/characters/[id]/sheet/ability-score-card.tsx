import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModalState } from "@/hooks/use-modal-state";
import { Character } from "@/models/character";
import { Skill, skillToAbility } from "@/models/skill";
import { Award, Brain, Eye, Heart, Users, Zap } from "lucide-react";
import { AbilityScore } from "./ability-score";

export function AbilityScoreCard({ character }: { character: Character }) {
	const skillListModalState = useModalState();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Award className="size-5" />
					Ability Score
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="grid grid-cols-3 md:grid-cols-6 gap-3">
					<AbilityScore
						name="strength"
						score={character.strength}
						icon={Users}
					/>
					<AbilityScore
						name="dexterity"
						score={character.dexterity}
						icon={Zap}
					/>
					<AbilityScore
						name="constitution"
						score={character.constitution}
						icon={Heart}
					/>
					<AbilityScore
						name="intelligence"
						score={character.intelligence}
						icon={Brain}
					/>
					<AbilityScore
						name="wisdom"
						score={character.wisdom}
						icon={Eye}
					/>
					<AbilityScore
						name="charisma"
						score={character.charisma}
						icon={Users}
					/>
				</div>

				<Button
					className="w-fit lg:hidden sm:block"
					size="sm"
					onClick={skillListModalState.onOpen}
				>
					View skills
				</Button>
			</CardContent>

			<SkillListModal {...skillListModalState} character={character} />
		</Card>
	);
}

interface SkillListModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	character: Character;
}

export default function SkillListModal({
	open,
	onOpenChange,
	character,
}: SkillListModalProps) {
	const getModifier = (skill: Skill) => {
		const abilityModifier = Math.floor(
			(character[skillToAbility[skill]] - 10) / 2,
		);

		const isProficient = false;
		const proficiencyBonus = isProficient ? character.proficiency : 0;
		return abilityModifier + proficiencyBonus;
	};

	if (!character) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-2xl">Skills</DialogTitle>
					<DialogDescription>
						All available skills for {character.name}
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="max-h-[60vh]">
					<div className="space-y-2">
						{Object.entries(skillToAbility).map(([skill, ability]) => (
							<div
								key={skill}
								className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
							>
								<div className="flex items-center gap-3">
									<div>
										<div className="font-medium text-slate-900 dark:text-slate-100">
											{skill}
										</div>
										<div className="text-xs text-slate-600 dark:text-slate-400">
											{ability}
										</div>
									</div>
								</div>
								<Badge className="text-lg font-bold justify-center">
									{getModifier(skill as Skill) >= 0 ? "+" : ""}
									{getModifier(skill as Skill)}
								</Badge>
							</div>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
