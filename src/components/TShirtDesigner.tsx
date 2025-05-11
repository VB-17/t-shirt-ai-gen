
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
  const [generatedImage, setGeneratedImage] = useState<string>("");

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
      const result: { prompt?: string; image?: string; error?: string } = {};

      const promptResponse = await ApiService.generatePrompt(values);

      if (!promptResponse.success) {
        throw new Error(promptResponse.error || "Failed to generate prompt");
      }

      result.prompt = promptResponse.data.prompt;

      const imageResponse = await ApiService.generateImage(result.prompt);

      if (!imageResponse.success) {
        throw new Error(imageResponse.error || "Failed to generate image");
      }

      result.image = imageResponse.data.image;

      setGeneratedImage(result.image);
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
          <WelcomeScreen onStart={handleStart} />
        )}

        {appState === "questions" && (
          <QuestionForm onHandleComplete={handleComplete} setAppState={setAppState} onBack={handleBack} />
        )}

        {appState === "loading" && (
          <LoadingScreen />
        )}

        {(appState === "result" && generatedImage != "") && (
          <ResultScreen generatedImage={generatedImage} onStartOver={handleStartOver} />
        )}
      </div>
    </div>
  );
};

export default Index;
