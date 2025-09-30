"use client";

import { IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function PracticeCard({
	title,
	description,
	id,
}: {
	title: string;
	description: string;
	id: string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<Link href={`/practice/${id}`} className="flex-1">
						<Button className="w-full">Practice</Button>
					</Link>
					<Button
						size="icon"
						className="size-8 group-data-[collapsible=icon]:opacity-0"
						variant="outline"
					>
						<IconSettings />
						<span className="sr-only">settings</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
