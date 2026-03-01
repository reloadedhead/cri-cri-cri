import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Character } from "@/models/character";
import { Award, Users, Zap, Heart, Brain, Eye } from "lucide-react";
import { AbilityScore } from "./ability-score";

export function AbilityScoreCard({ character }: { character: Character }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5" />
          Ability Score
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
