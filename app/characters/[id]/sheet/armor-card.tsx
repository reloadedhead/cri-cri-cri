import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Character } from "@/models/character";
import { Shield, Badge } from "lucide-react";

export function ArmorCard({ character }: { character: Character }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Armor & Defense
        </CardTitle>
      </CardHeader>
      <CardContent>
        {character.armor.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            No armor added yet
          </div>
        ) : (
          <div className="space-y-3">
            {character.armor.map((armor, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      {armor.name}
                    </div>
                    {armor.type && <Badge className="mt-1">{armor.type}</Badge>}
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      AC
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {armor.ac || `+${armor.acBonus}`}
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
