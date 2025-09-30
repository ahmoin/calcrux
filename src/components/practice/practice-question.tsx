"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Question = {
	question: string;
	answer: string;
	hint: string;
};

type PracticeQuestionProps = {
	question: Question;
	onNext: () => void;
	onAnswer: (isCorrect: boolean) => void;
};

export function PracticeQuestion({
	question,
	onNext,
	onAnswer,
}: PracticeQuestionProps) {
	const [userAnswer, setUserAnswer] = React.useState("");
	const [showHint, setShowHint] = React.useState(false);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const [hasAnswered, setHasAnswered] = React.useState(false);

	const checkAnswer = () => {
		if (hasAnswered) return;

		const correct = userAnswer.trim() === question.answer;
		setIsCorrect(correct);
		setHasAnswered(true);
		onAnswer(correct);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			checkAnswer();
		}
	};

	const handleNext = () => {
		setUserAnswer("");
		setShowHint(false);
		setIsCorrect(null);
		setHasAnswered(false);
		onNext();
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Practice Question
				</CardTitle>
				<CardDescription className="text-center">
					{question.question}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Input
						type="text"
						value={userAnswer}
						onChange={(e) => setUserAnswer(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Your answer..."
						className="text-center text-xl py-6"
						autoFocus
						disabled={isCorrect !== null}
					/>
					{isCorrect !== null && (
						<p
							className={`text-center text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}
						>
							{isCorrect
								? "Correct! 🎉"
								: `Incorrect. The answer is ${question.answer}`}
						</p>
					)}
					{showHint && (
						<p className="text-sm text-muted-foreground text-center">
							💡 {question.hint}
						</p>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col space-y-2">
				<div className="flex space-x-2 w-full">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => setShowHint(!showHint)}
					>
						{showHint ? "Hide Hint" : "Show Hint"}
					</Button>
					{hasAnswered ? (
						<Button className="flex-1" onClick={handleNext}>
							Next Question
						</Button>
					) : (
						<Button
							className="flex-1"
							onClick={checkAnswer}
							disabled={!userAnswer.trim()}
						>
							Check Answer
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
