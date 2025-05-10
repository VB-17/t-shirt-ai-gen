import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ResultScreenProps {
  generatedImage: string;
  onStartOver: () => void;
}

const ResultScreen = ({ generatedImage, onStartOver }: ResultScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-tshirt-text">
        Your T-Shirt Design
      </h1>

      <div className="w-full max-w-2xl mb-8">
        <Image
          src={generatedImage}
          alt="T-shirt mockup"
          width={672}
          height={672}
          className="rounded-lg shadow-md object-contain"
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          onClick={onStartOver}
          variant="outline"
          className="border-tshirt-border hover:bg-tshirt-lightgray text-tshirt-text px-6"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;