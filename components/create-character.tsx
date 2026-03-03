"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, Class } from "@/models/character";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCharacterStore } from "@/store/use-character-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useClassOptions } from "@/hooks/use-class-options";
import { useRaceOptions } from "@/hooks/use-race-options";

interface CreateCharacterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export default function CreateCharacterModal({
  open,
  onOpenChange,
}: CreateCharacterModalProps) {
  const router = useRouter();
  const { add } = useCharacterStore();
  const [isCreating, setIsCreating] = useState(false);
  const classOptions = useClassOptions();
  const raceOptions = useRaceOptions();

  const [formData, setFormData] = useState({
    name: "",
    race: "",
    class: "Druid",
    level: 1,
    maxHP: 10,
    ac: 10,
    initiative: 0,
    proficiency: 2,
    speed: 30,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    const character: Character = {
      name: formData.name,
      race: formData.race,
      class: formData.class as Class,
      level: formData.level,
      hp: {
        current: formData.maxHP,
        max: formData.maxHP,
      },
      ac: formData.ac,
      initiative: formData.initiative,
      proficiency: formData.proficiency,
      speed: formData.speed,
      abilities: {
        Strength: {
          score: formData.strength,
          modifier: calculateModifier(formData.strength),
        },
        Dexterity: {
          score: formData.dexterity,
          modifier: calculateModifier(formData.dexterity),
        },
        Constitution: {
          score: formData.constitution,
          modifier: calculateModifier(formData.constitution),
        },
        Intelligence: {
          score: formData.intelligence,
          modifier: calculateModifier(formData.intelligence),
        },
        Wisdom: {
          score: formData.wisdom,
          modifier: calculateModifier(formData.wisdom),
        },
        Charisma: {
          score: formData.charisma,
          modifier: calculateModifier(formData.charisma),
        },
      },
      weapons: [],
      armor: [],
      skills: [],
    };

    const id = add(character);
    router.push(`/character/${id}`);
  };

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Character</DialogTitle>
          <DialogDescription>
            Fill in the basic details for your new adventurer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Thorin Ironforge"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="race">Race *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {raceOptions.map((race) => (
                      <SelectItem key={race.value} value={race.value}>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {classOptions.map((option) => (
                      <SelectItem value={option.value} key={option.value}>
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
                  type="number"
                  min="1"
                  max="20"
                  value={formData.level}
                  onChange={(e) =>
                    updateField("level", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxHP">Max HP</Label>
                <Input
                  id="maxHP"
                  type="number"
                  min="1"
                  value={formData.maxHP}
                  onChange={(e) =>
                    updateField("maxHP", parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ac">AC</Label>
                <Input
                  id="ac"
                  type="number"
                  min="1"
                  value={formData.ac}
                  onChange={(e) => updateField("ac", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initiative">Initiative</Label>
                <Input
                  id="initiative"
                  type="number"
                  value={formData.initiative}
                  onChange={(e) =>
                    updateField("initiative", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proficiency">Proficiency</Label>
                <Input
                  id="proficiency"
                  type="number"
                  min="2"
                  max="6"
                  value={formData.proficiency}
                  onChange={(e) =>
                    updateField("proficiency", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="speed">Speed</Label>
                <Input
                  id="speed"
                  type="number"
                  min="0"
                  value={formData.speed}
                  onChange={(e) =>
                    updateField("speed", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>

          {/* Ability Scores */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ability Scores</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { key: "strength", label: "STR" },
                { key: "dexterity", label: "DEX" },
                { key: "constitution", label: "CON" },
                { key: "intelligence", label: "INT" },
                { key: "wisdom", label: "WIS" },
                { key: "charisma", label: "CHA" },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-xs uppercase">
                    {label}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    min="1"
                    max="30"
                    value={formData[key as keyof typeof formData] as number}
                    onChange={(e) => updateField(key, parseInt(e.target.value))}
                    className="text-center"
                  />
                  <div className="text-xs text-center text-slate-600 dark:text-slate-400">
                    {calculateModifier(
                      formData[key as keyof typeof formData] as number,
                    ) >= 0
                      ? "+"
                      : ""}
                    {calculateModifier(
                      formData[key as keyof typeof formData] as number,
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isCreating ||
                !formData.name ||
                !formData.race ||
                !formData.class
              }
            >
              {isCreating ? "Creating..." : "Create Character"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
