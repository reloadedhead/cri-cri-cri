import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from "@/models/character";
import { Skill, skillToAbility } from "@/models/skill";
import { MedalIcon } from "lucide-react";

export function SkillsCard({ character }: { character: Character }) {
  const getModifier = (skill: Skill) => {
    const abilityModifier = character.abilities[skillToAbility[skill]].modifier;
    const isProficient = false;
    const proficiencyBonus = isProficient ? character.proficiency : 0;
    return abilityModifier + proficiencyBonus;
  };

  return (
    <Card className="max-h-dvh overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MedalIcon className="size-5" />
          Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        {Object.entries(skillToAbility).map(([skill, ability]) => (
          <div
            key={skill}
            className="flex flex-row justify-between items-center border-b-2 py-1 last:border-none"
          >
            <div className="text-xs font-medium text-main-foreground uppercase">
              {skill}
              {"  "}
              <span className="text-slate-500 font-normal">{ability}</span>
            </div>
            <div className="text-xl font-bold text-main-foreground">
              {getModifier(skill as Skill)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
