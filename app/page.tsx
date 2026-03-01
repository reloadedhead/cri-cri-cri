// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCharacter } from "@/hooks/use-character";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CharactersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  const {
    characters,
    listCharacters,
    deleteCharacter,
    importCharacter,
    isLoading,
  } = useCharacter();

  useEffect(() => {
    listCharacters();
  }, [listCharacters]);

  const handleView = (id: string) => {
    router.push(`/characters/${id}/sheet`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete ${name}? This cannot be undone.`)) {
      await deleteCharacter(id);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        await importCharacter(imported);
      } catch (error) {
        alert("Failed to import character. Invalid file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleCreateNew = () => {
    setCreateModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl">Your Characters</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="w-4 h-4" />
                New Character
              </Button>
              <label className="cursor-pointer">
                <Button className="gap-2" asChild>
                  <span>
                    <Upload className="w-4 h-4" />
                    Import
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
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
                    <TableHead className="hidden md:table-cell">
                      Last Modified
                    </TableHead>
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
                      <TableCell className="hidden md:table-cell text-sm text-slate-600 dark:text-slate-400">
                        {formatDate(character.lastModified)}
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
                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
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
