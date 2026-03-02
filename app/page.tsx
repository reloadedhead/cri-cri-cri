// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Upload, Eye } from "lucide-react";
import CreateCharacterModal from "@/components/create-character";
import { useCharacterStore } from "@/store/use-character-store";

export default function CharactersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  const { characters, hasHydrated, remove } = useCharacterStore();

  const handleView = (id: string) => {
    router.push(`/characters/${id}/sheet`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete ${name}? This cannot be undone.`)) {
      remove(id);
    }
  };

  const handleCreateNew = () => {
    setCreateModalOpen(true);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your Characters</CardTitle>
          <CardDescription className="flex items-center justify-end gap-4">
            {characters.length > 0 ? (
              <Button onClick={handleCreateNew} className="gap-2" size="sm">
                <Plus className="w-4 h-4" />
                New Character
              </Button>
            ) : null}
            <label>
              <Button className="gap-2" disabled size="sm">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <input type="file" accept=".json" className="hidden" />
            </label>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasHydrated ? (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              Loading characters...
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No characters yet. Create your first adventurer!
              </p>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Character
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {characters.map((character) => (
                    <TableRow
                      key={character.id}
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => handleView(character.id)}
                    >
                      <TableCell className="font-medium">
                        {character.name}
                      </TableCell>
                      <TableCell>
                        <Badge>{character.class}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{character.level}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleView(character.id)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleDelete(character.id, character.name)
                            }
                            className="gap-1 text-white bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateCharacterModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
}

function EmptyState() {}
