import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Character } from "@/models/character";
import { CircleStar, FlagTriangleRightIcon, ShieldIcon } from "lucide-react";

export function CharacterHeaderCard({ character }: { character: Character }) {
	return (
		<Card className="bg-main">
			<CardHeader className="flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<CardTitle className="text-3xl md:text-4xl font-bold">
						{character.name}
					</CardTitle>
					<CardDescription>
						Level {character.level} {character.race} {character.class}
					</CardDescription>
				</div>

				<Avatar className="size-20">
					<AvatarFallback>
						<span className="text-lg">{character.name[0]}</span>
					</AvatarFallback>
				</Avatar>
			</CardHeader>

			<CardContent className="flex gap-2 flex-wrap">
				<Badge variant="neutral" className="text-sm">
					<ShieldIcon className="size-6" /> AC {character.ac}
				</Badge>

				<Badge variant="neutral" className="text-sm">
					<FlagTriangleRightIcon className="size-6" /> Initiative {0}
				</Badge>

				<Badge variant="neutral" className="text-sm">
					<CircleStar className="size-6" /> Proficiency +
					{character.proficiency}
				</Badge>
			</CardContent>
		</Card>
	);
}
