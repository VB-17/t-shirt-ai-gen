import { Button } from "@/components/ui/button";
import ResultCarousel from "./ui/ResultCarousel";

interface ResultScreenProps {
  generatedImages: string[];
  onStartOver: () => void;
}

const ResultScreen = ({ generatedImages, onStartOver }: ResultScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-tshirt-text">
        あなたのTシャツデザイン
      </h1>

      <div className="mx-auto">
        <ResultCarousel
          images={generatedImages}
        />
      </div>


      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          onClick={onStartOver}
          variant="outline"
          className="cursor-pointer border-tshirt-border hover:bg-tshirt-lightgray text-tshirt-text px-6"
        >
          最初からやり直す
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
