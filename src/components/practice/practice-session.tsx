"use client";

import * as React from "react";
import { PracticeQuestion } from "./practice-question";

type Question = {
	question: string;
	answer: string;
	hint: string;
	graph?: {
		latex: string;
	};
};

type PracticeSessionProps = {
	practiceId: string;
};

const generateQuestion = (id: string): Question => {
	switch (id) {
		case "multiplication-1": {
			const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
			const num2 = 11;
			return {
				question: `${num1} × ${num2} = ?`,
				answer: (num1 * num2).toString(),
				hint: "Simply add the digits of the number being multiplied by 11 and place the sum between the original digits",
			};
		}
		case "squaring-1": {
			const lastDigit = 5;
			const firstDigit = Math.floor(Math.random() * 9) + 1; // 1-9
			const num = parseInt(`${firstDigit}${lastDigit}`);
			return {
				question: `${num}² = ?`,
				answer: (num * num).toString(),
				hint: `Multiply ${firstDigit} by (${firstDigit} + 1), then append 25`,
			};
		}
		case "multiplication-2": {
			const firstDigit = Math.floor(Math.random() * 9) + 1; // 1-9
			const secondDigit1 = Math.floor(Math.random() * 5) + 1; // 1-5
			const secondDigit2 = 10 - secondDigit1;
			const num1 = parseInt(`${firstDigit}${secondDigit1}`);
			const num2 = parseInt(`${firstDigit}${secondDigit2}`);
			return {
				question: `${num1} × ${num2} = ?`,
				answer: (num1 * num2).toString(),
				hint: `Multiply ${firstDigit} by (${firstDigit} + 1) and\nappend ${secondDigit1 * secondDigit2} (which we get from ${secondDigit1} * ${secondDigit2})`,
			};
		}
		case "polynomial-symmetry": {
			const polynomials = [
				// Even functions (symmetric about y-axis)
				{ latex: "x^2", answer: "even", hint: "Even functions satisfy f(-x) = f(x). The graph is symmetric about the y-axis." },
				{ latex: "x^4-2x^2+1", answer: "even", hint: "Even functions satisfy f(-x) = f(x). The graph is symmetric about the y-axis." },
				{ latex: "x^2+3", answer: "even", hint: "Even functions satisfy f(-x) = f(x). The graph is symmetric about the y-axis." },
				{ latex: "-x^4+4x^2", answer: "even", hint: "Even functions satisfy f(-x) = f(x). The graph is symmetric about the y-axis." },
				// Odd functions (symmetric about origin)
				{ latex: "x^3", answer: "odd", hint: "Odd functions satisfy f(-x) = -f(x). The graph is symmetric about the origin (180° rotation)." },
				{ latex: "x^3-x", answer: "odd", hint: "Odd functions satisfy f(-x) = -f(x). The graph is symmetric about the origin (180° rotation)." },
				{ latex: "x^5-2x^3", answer: "odd", hint: "Odd functions satisfy f(-x) = -f(x). The graph is symmetric about the origin (180° rotation)." },
				{ latex: "2x^3+x", answer: "odd", hint: "Odd functions satisfy f(-x) = -f(x). The graph is symmetric about the origin (180° rotation)." },
				// Neither
				{ latex: "x^3+1", answer: "neither", hint: "This function has no symmetry. It's neither even nor odd." },
				{ latex: "x^2+x", answer: "neither", hint: "This function has no symmetry. It's neither even nor odd." },
				{ latex: "x^3-x^2+1", answer: "neither", hint: "This function has no symmetry. It's neither even nor odd." },
				{ latex: "x^4+x", answer: "neither", hint: "This function has no symmetry. It's neither even nor odd." },
			];
			const selected = polynomials[Math.floor(Math.random() * polynomials.length)];
			return {
				question: "Is this function odd, even, or neither?",
				answer: selected.answer,
				hint: selected.hint,
				graph: {
					latex: selected.latex,
				},
			};
		}
		default:
			return {
				question: "Select a practice mode",
				answer: "",
				hint: "Choose from the available practice options",
			};
	}
};

export function PracticeSession({ practiceId }: PracticeSessionProps) {
	const [currentQuestion, setCurrentQuestion] = React.useState<Question>(() =>
		generateQuestion(practiceId),
	);
	const [score, setScore] = React.useState(0);
	const [questionsAttempted, setQuestionsAttempted] = React.useState(0);

	const handleAnswer = (isCorrect: boolean) => {
		setQuestionsAttempted((prev) => prev + 1);
		if (isCorrect) {
			setScore((prev) => prev + 1);
		}
	};

	const generateNewQuestion = () => {
		setCurrentQuestion(generateQuestion(practiceId));
	};

	const percentage =
		questionsAttempted > 0 ? Math.round((score / questionsAttempted) * 100) : 0;
	const title = practiceId
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return (
		<div className="flex flex-col h-full w-full p-4">
			<div className="w-full mb-4">
				<h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
				<div className="w-full pt-2 text-sm text-center text-muted-foreground">
					Score: {score} / {questionsAttempted} • {percentage}%
				</div>
			</div>
			<div className="flex-1 flex items-center justify-center">
				<PracticeQuestion
					question={currentQuestion}
					onAnswer={handleAnswer}
					onNext={generateNewQuestion}
				/>
			</div>
		</div>
	);
}
