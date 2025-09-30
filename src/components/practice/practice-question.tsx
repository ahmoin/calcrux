"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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

const FormSchema = z.object({
	answer: z.string().min(1, "Answer is required"),
});

export function PracticeQuestion({
	question,
	onNext,
	onAnswer,
}: PracticeQuestionProps) {
	const [showHint, setShowHint] = React.useState(false);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const [hasAnswered, setHasAnswered] = React.useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			answer: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (hasAnswered) {
			setShowHint(false);
			setIsCorrect(null);
			setHasAnswered(false);
			form.reset({ answer: "" });
			onNext();
			return;
		}
		const correct = data.answer.trim() === question.answer;
		setIsCorrect(correct);
		setHasAnswered(true);
		onAnswer(correct);
	}
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
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="answer"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Answer</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>Enter your answer.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex space-x-2 w-full">
								<Button type="submit" className="flex-1">
									{hasAnswered ? "Next Question" : "Submit"}
								</Button>
								<Button
									type="button"
									variant="outline"
									className="flex-1"
									onClick={() => setShowHint(!showHint)}
								>
									{showHint ? "Hide Hint" : "Show Hint"}
								</Button>
							</div>
						</form>
					</Form>
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
						<p className="text-sm text-muted-foreground text-center whitespace-pre-line">
							💡 {question.hint}
						</p>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center"></CardFooter>
		</Card>
	);
}
