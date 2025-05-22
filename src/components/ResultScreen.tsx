import { Button } from "@/components/ui/button";
import TShirtDesignOverlay from "./TShirtDesignOverlay";

interface ResultScreenProps {
  generatedImage: string;
  onStartOver: () => void;
}

const ResultScreen = ({ generatedImage, onStartOver }: ResultScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-tshirt-text">
        あなたのTシャツデザイン
      </h1>

      <div className="w-full max-w-2xl mb-8 space-y-10">
        {/* eslint-disable-next-line @next/next/no-img-element  */}
        <TShirtDesignOverlay
          designUrl={`data:image/png;base64,${generatedImage}`}
        />

        <img
          src={`data:image/png;base64,${generatedImage}`}
          alt="t-shirt design"
          className="size-[400px] h-full w-fulll"
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
