import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import TShirtDesignOverlay from "../TShirtDesignOverlay"



export default function ResultCarousel({ images }: {
  images: string[]
}) {

  return (
    <Carousel className="flex items-center justify-center w-full max-w-2xl mb-8">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-col justify-center items-center space-y-10">
              <TShirtDesignOverlay
                designUrl={`data:image/png;base64,${img}`}
              />

              <img
                src={`data:image/png;base64,${img}`}
                alt="t-shirt design"
                className="size-[400px] h-full w-fulll"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}