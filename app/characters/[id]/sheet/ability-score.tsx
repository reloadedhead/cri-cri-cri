import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ability } from "@/models/character";
import { FC } from "react";

interface Props {
	name: Ability;
	score: number;
	icon: FC<{ className?: string }>;
}

export function AbilityScore({ name, score, icon: Icon }: Props) {
	const modifier = Math.floor((score - 10) / 2);

	return (
		<Card className="flex flex-col items-center px-4 bg-secondary-background">
			<Icon className="w-5 h-5 mb-2 text-slate-600 dark:text-slate-400" />
			<div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
				{name}
			</div>
			<div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
				{score}
			</div>
			<Badge variant={modifier >= 0 ? "default" : "neutral"}>
				{modifier >= 0 ? "+" : ""}
				{modifier}
			</Badge>
		</Card>
	);
}
