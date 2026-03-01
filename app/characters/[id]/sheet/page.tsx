// app/characters/[id]/sheet/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCharacter } from "@/hooks/use-character";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Sword, ArrowLeft } from "lucide-react";
import { HitPointsCard } from "./hitpoints-card";
import { CharacterHeaderCard } from "./character-header-card";
import { AbilityScoreCard } from "./ability-score-card";
import { WeaponsCard } from "./weapons-card";
import { ArmorCard } from "./armor-card";

export default function CharacterSheetPage() {
  const params = useParams();
  const router = useRouter();
  const { character, loadCharacter, isLoading, error } = useCharacter();
  const characterId = params.id as string;

  useEffect(() => {
    if (characterId) {
      loadCharacter(characterId);
    }
  }, [characterId, loadCharacter]);

  const handleBack = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen `bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading character...</div>
          <div className="text-slate-600 dark:text-slate-400">Please wait</div>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen `bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">
              Error Loading Character
            </CardTitle>
            <CardDescription>{error || "Character not found"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Characters
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl">
        <CharacterHeaderCard character={character} />
        <HitPointsCard character={character} />
        <AbilityScoreCard character={character} />

        <Tabs defaultValue="weapons" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="weapons">
              Weapons
            </TabsTrigger>
            <TabsTrigger className="w-full" value="armor">
              Armor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weapons">
            <WeaponsCard character={character} />
          </TabsContent>

          <TabsContent value="armor">
            <ArmorCard character={character} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
