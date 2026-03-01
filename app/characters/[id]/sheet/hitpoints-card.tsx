import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCharacter } from "@/hooks/use-character";
import { Character } from "@/models/character";
import { Heart, Minus, Plus, RefreshCw } from "lucide-react";

export function HitPointsCard({ character }: { character: Character }) {
  const { adjustHP, resetHP } = useCharacter();

  const hpPercentage = (character.hp.current / character.hp.max) * 100;

  const getHPColor = () => {
    if (hpPercentage > 50) return "bg-green-500";
    if (hpPercentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const onShortcutClick = (amount: number) => () => adjustHP(amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-4 h-4 fill-red-500" />
          Hit Points
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">
            {character.hp.current} / {character.hp.max}
          </span>

          <Button
            size="sm"
            onClick={resetHP}
            className="hover:bg-blue-100 dark:hover:bg-blue-950"
            disabled={character.hp.current === character.hp.max}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Full
          </Button>
        </div>
        <Progress value={hpPercentage} className={`h-3 ${getHPColor()}`} />

        <div className="flex gap-4">
          <div className="flex gap-2 w-full md:w-fit">
            <Button
              size="sm"
              onClick={onShortcutClick(-10)}
              className="hover:bg-red-100 dark:hover:bg-red-950 flex-1"
            >
              <Minus className="w-4 h-4 mr-1" />
              10
            </Button>
            <Button
              size="sm"
              onClick={onShortcutClick(-1)}
              className="hover:bg-red-100 dark:hover:bg-red-950 flex-1"
            >
              <Minus className="w-4 h-4 mr-1" />1
            </Button>
          </div>

          <div className="flex gap-2 w-full md:w-fit">
            <Button size="sm" onClick={onShortcutClick(1)} className="flex-1">
              <Plus className="w-4 h-4 mr-1" />1
            </Button>
            <Button size="sm" onClick={onShortcutClick(10)} className="flex-1">
              <Plus className="w-4 h-4 mr-1" />
              10
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
