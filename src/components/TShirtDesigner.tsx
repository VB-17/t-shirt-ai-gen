
"use client"


import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionForm from "@/components/QuestionForm";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { FormSchema, useQuestionsForm } from "@/hooks/use-questions-form";
import { ApiService } from "@/lib/api";

export type AppState = "welcome" | "questions" | "loading" | "result";


const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const { form } = useQuestionsForm();

  const handleStart = () => {
    setAppState("questions");
  };


  const handleBack = () => {
    setAppState("welcome");
  };


  const handleStartOver = () => {
    form.reset();
    setAppState("welcome");
  };

  const handleComplete = async (values: FormSchema) => {
    setAppState("loading");

    try {
      const result: { prompts?: string[]; images?: string[]; error?: string } = {};

      const promptResponse = await ApiService.generatePrompt(values);

      if (!promptResponse.success) {
        throw new Error(promptResponse.error || "Failed to generate prompt");
      }

      result.prompts = promptResponse.data.prompts;

      const imageResponse = await ApiService.generateImage(result.prompts);

      if (!imageResponse.success) {
        throw new Error(imageResponse.error || "Failed to generate image");
      }

      result.images = imageResponse.data.images;

      setGeneratedImages(result.images);
      setAppState("result");
    } catch (error) {
      console.error("Error in handleComplete:", error);
      alert("Error occured")
      setAppState("welcome");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm">
        {appState === "welcome" && (
          <WelcomeScreen onBulkSubmit={handleComplete} onStart={handleStart} />
        )}

        {appState === "questions" && (
          <QuestionForm onHandleComplete={handleComplete} setAppState={setAppState} onBack={handleBack} />
        )}

        {appState === "loading" && (
          <LoadingScreen />
        )}

        {(appState === "result" && generatedImages.length != 0) && (
          <ResultScreen generatedImages={generatedImages} onStartOver={handleStartOver} />
        )}
      </div>
    </div>
  );
};

export default Index;
