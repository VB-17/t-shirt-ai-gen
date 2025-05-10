// components/WelcomeScreen.tsx
import { Button } from "@/components/ui/button";


type WelcomeScreenProps = {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        Design Your Custom T-Shirt
      </h1>
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-lg mb-10">
        Answer a few questions to generate a unique T-shirt design with AI
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
        Start Designing
      </Button>

    </div>
  );
};

export default WelcomeScreen;
