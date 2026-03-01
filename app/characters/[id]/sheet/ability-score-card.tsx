import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Character } from "@/models/character";
import { Award, Users, Zap, Heart, Brain, Eye } from "lucide-react";
import { AbilityScore } from "./ability-score";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModalState } from "@/hooks/use-modal-state";
import { Button } from "@/components/ui/button";
import { Skill, skillToAbility } from "@/models/skill";

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
            name="Strength"
            {...character.abilities.Strength}
            icon={Users}
          />
          <AbilityScore
            name="Dexterity"
            {...character.abilities.Dexterity}
            icon={Zap}
          />
          <AbilityScore
            name="Constitution"
            {...character.abilities.Constitution}
            icon={Heart}
          />
          <AbilityScore
            name="Intelligence"
            {...character.abilities.Intelligence}
            icon={Brain}
          />
          <AbilityScore
            name="Wisdom"
            {...character.abilities.Wisdom}
            icon={Eye}
          />
          <AbilityScore
            name="Charisma"
            {...character.abilities.Charisma}
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
    const abilityModifier = character.abilities[skillToAbility[skill]].modifier;
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
