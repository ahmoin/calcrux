"use client";

import { PracticeCard } from "@/components/practice-card";

export function PracticeCards() {
	return (
		<div className="grid grid-cols-1 gap-6 mx-6 lg:grid-cols-2 xl:grid-cols-3">
			<PracticeCard
				title="Multiplication I"
				id="multiplication-1"
				description="Multiply any two-digit or three-digit number by 11"
			/>
			<PracticeCard
				title="Squaring I"
				id="squaring-1"
				description="Square any number ending with 5"
			/>
			<PracticeCard
				title="Multiplication II"
				id="multiplication-2"
				description="Multiply two-digit numbers with the same first digit, and second digits that sum to 10"
			/>
		</div>
	);
}
