import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DateCarouselProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateCarousel: React.FC<DateCarouselProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <Carousel
      className="max-w-lg my-2"
      opts={{ align: "center" }}
      style={{ maxWidth: "calc(100% - 50px)" }}
    >
      <CarouselContent className="-ml-2">
        {dates.map((date, index) => {
          console.log(selectedDate, date);
          return (
            <CarouselItem key={index} className="basis-1/4 sm:basis-1/6 pl-2">
              <Button
                variant={selectedDate === date ? "default" : "outline"}
                onClick={() => onSelectDate(date)}
                className="p-2"
              >
                {date}
              </Button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DateCarousel;
