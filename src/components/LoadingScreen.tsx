
import LoadingSpinner from "@/components/LoadingSpinner";
import { Sparkles } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="relative mb-8">
        <LoadingSpinner />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="text-tshirt-accent h-6 w-6" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-center text-tshirt-text">
        Generating your T-shirt design...
      </h2>
      <p className="text-md text-tshirt-text/70 text-center max-w-md animate-pulse-gentle">
        Our AI is creating a unique design based on your preferences. This may take a few moments.
      </p>

      <div className="mt-8 flex flex-col gap-2 w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">Analyzing your preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">Creating unique artwork</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">Applying to t-shirt template</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
