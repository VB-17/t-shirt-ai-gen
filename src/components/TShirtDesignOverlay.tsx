import { useRef, useEffect } from 'react';

type TShirtDesignOverlayProps = {
  designUrl: string; // Should be a URL to a transparent PNG
};

export default function TShirtDesignOverlay({ designUrl }: TShirtDesignOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tshirtImage = '/shirt.png';

  useEffect(() => {
    if (!designUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const tshirtImg = new Image();
    tshirtImg.crossOrigin = 'anonymous';
    tshirtImg.src = tshirtImage;

    tshirtImg.onload = () => {
      canvas.width = tshirtImg.width;
      canvas.height = tshirtImg.height;


      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tshirtImg, 0, 0);


      const designImg = new Image();
      designImg.crossOrigin = 'anonymous';
      designImg.src = designUrl;

      designImg.onload = () => {
        const maxDesignWidth = 500;
        const maxDesignHeight = 500;

        const widthRatio = maxDesignWidth / designImg.width;
        const heightRatio = maxDesignHeight / designImg.height;
        const scale = Math.min(widthRatio, heightRatio);

        const designWidth = designImg.width * scale;
        const designHeight = designImg.height * scale;

        const x = (canvas.width - designWidth) / 2;
        const y = (canvas.height - designHeight) / 2;

        ctx.drawImage(designImg, x, y, designWidth, designHeight);
      };

      designImg.onerror = () => {
        console.error("Failed to load design image:", designUrl);
      };
    };

    tshirtImg.onerror = () => {
      console.error("Failed to load T-shirt image:", tshirtImage);
    };
  }, [designUrl]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}


