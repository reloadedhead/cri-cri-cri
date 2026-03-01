import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Character } from "@/models/character";
import { Sword, Badge } from "lucide-react";

export function WeaponsCard({ character }: { character: Character }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sword className="w-5 h-5" />
          Weapons
        </CardTitle>
      </CardHeader>
      <CardContent>
        {character.weapons.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            No weapons added yet
          </div>
        ) : (
          <div className="space-y-3">
            {character.weapons.map((weapon, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      {weapon.name}
                    </div>
                    <Badge className="mt-1">{weapon.type}</Badge>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Attack
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        +{weapon.bonus}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Damage
                      </div>
                      <div className="text-xl font-bold text-red-600">
                        {weapon.damage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
