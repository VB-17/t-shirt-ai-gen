// components/WelcomeScreen.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { formSchema, FormSchema, questions } from "@/hooks/use-questions-form";
import { z } from "zod";

type WelcomeScreenProps = {
  onStart: () => void;
  onBulkSubmit: (values: FormSchema) => Promise<void>
}

const WelcomeScreen = ({ onStart, onBulkSubmit }: WelcomeScreenProps) => {
  const [bulkInput, setBulkInput] = useState("");

  const handleBulkSubmit = async () => {
    const answers = bulkInput.trim().split('\n').map(line => line.trim());

    if (answers.length !== questions.length) {
      alert(`回答の数が正しくありません。${questions.length}個の回答が必要です（現在${answers.length}個）。`);
      return;
    }

    const inputData: Record<string, string> = {};

    questions.forEach((question, index) => {
      inputData[question.id] = answers[index];
    });

    try {
      const parsed = formSchema.parse(inputData);
      await onBulkSubmit(parsed);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.errors[0];
        alert(`エラー: ${firstError.message}`);
      } else {
        alert("予期しないエラーが発生しました。");
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center animate-in fade-in duration-300 pr-8 border-r">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          あなただけのカスタムTシャツをデザインしよう
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center max-w-lg mb-10">
          AIを使って、いくつかの質問に答えるだけでユニークなTシャツデザインを作成できます
        </p>

        <div className="mb-8 w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </svg>
        </div>

        <Button
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-md text-lg font-medium transition-all"
        >
          デザインを始める
        </Button>

      </div>

      <div className="pl-8 space-y-6 h-full" >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">一括入力</h1>
          <p className="text-xs text-muted-foreground">各回答を1行ずつ入力してください（1行につき1つの質問の回答）。</p>
        </div>


        <div className="space-y-4">
          <Textarea
            className="w-64 h-96"
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
          />

          <Button
            onClick={handleBulkSubmit}
            className="cursor-pointer"
          >
            デザインの生成
          </Button>

        </div>
      </div>
    </div>

  );
};

export default WelcomeScreen;
