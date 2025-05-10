"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ProgressBar from "@/components/ProgressBar";
import { useQuestionsForm } from "@/hooks/use-questions-form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import RadioGroupWithOther from "./RadioGroupWithOther";
import { AppState } from "./TShirtDesigner";


interface QuestionFormProps {
  setAppState?: (type: AppState) => void;
  onBack: () => void;
  onHandleComplete: () => Promise<void>
}

const QuestionForm = ({ onHandleComplete, onBack }: QuestionFormProps) => {
  const { form, questions } = useQuestionsForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentStep - 1];


  const handleNext = async () => {
    const isValid = await form.trigger(currentQuestion.id);

    if (!isValid) return;

    if (currentQuestion.type === "radio" &&
      currentQuestion.options?.includes("その他") &&
      form.getValues(currentQuestion.id) === "その他"
    ) {
      form.setError(currentQuestion.id, {
        message: "Please provide a value"
      });

      return;
    }

    if (currentStep < questions.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      await onHandleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onBack();
    }
  };

  const renderInput = <T extends FieldValues>(field: ControllerRenderProps<T>) => {
    switch (currentQuestion.type) {
      case "text":
        return (
          <Input
            {...field}
            placeholder="Type your answer here..."
            className="w-full py-6 text-lg border-tshirt-border focus:border-tshirt-accent"
            aria-describedby={`${currentQuestion.id}-error`}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...field}
            placeholder="Type your answer here..."
            className="w-full h-32 border-tshirt-border focus:border-tshirt-accent"
            aria-describedby={`${currentQuestion.id}-error`}
          />
        );
      case "radio":
        return (
          <RadioGroupWithOther
            field={field}
            options={currentQuestion.options!}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xl mx-auto">
        <div className="mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
        </div>

        <div
          className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
        >
          <FormField
            key={currentQuestion.id}
            control={form.control}
            name={currentQuestion.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl font-semibold text-tshirt-text">
                  {currentQuestion.text}
                </FormLabel>
                <FormControl>
                  {renderInput(field)}
                </FormControl>
                <FormMessage
                  id={`${currentQuestion.id}-error`}
                  className="text-red-500 text-sm mt-1"
                />
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="border-tshirt-border hover:bg-tshirt-lightgray text-tshirt-text"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>

            <Button
              type={"button"}
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {currentStep === questions.length ? "Generate Design" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;