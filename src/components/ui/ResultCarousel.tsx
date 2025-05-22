import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



export default function ResultCarousel({ images }: {
  images: string[]
}) {

  
  return (
    <Carousel className="w-full max-w-2xl mb-8">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="space-y-10">

            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}