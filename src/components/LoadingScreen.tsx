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
        あなたのTシャツデザインを生成中...
      </h2>
      <p className="text-md text-tshirt-text/70 text-center max-w-md animate-pulse-gentle">
        AIがあなたの好みに基づいてユニークなデザインを作成しています。少々お待ちください。
      </p>

      <div className="mt-8 flex flex-col gap-2 w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">あなたの好みを分析中</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">ユニークなアートワークを作成中</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-tshirt-accent"></div>
          <p className="text-sm text-tshirt-text/60">Tシャツテンプレートに適用中</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
