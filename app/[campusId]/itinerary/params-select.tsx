"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Child } from "../../../lib/db/schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ParamsSelectProps {
  dates: string[];
  selectedDate: string;
  currentChild: Child;
  childs: Child[];
}

const ParamsSelect: React.FC<ParamsSelectProps> = ({
  currentChild,
  childs,
  selectedDate,
  dates,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQueryParams = (params: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const childIdSearchParam = searchParams.get("childId");
  const dateSearchParam = searchParams.get("date");
  if (!childIdSearchParam || !dateSearchParam) {
    addQueryParams({ childId: currentChild.id.toString(), date: selectedDate });
  }

  return (
    <>
      <div className="flex items-center m-2 w-full">
        <Select
          defaultValue={currentChild.id.toString()}
          onValueChange={(value) =>
            addQueryParams({ childId: value.toString() })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {childs.map((child) => (
              <SelectItem key={child.id} value={child.id.toString()}>
                {child.firstName} {child.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Carousel
        className="my-2"
        opts={{ align: "center" }}
        style={{ maxWidth: "calc(100% - 100px)" }}
      >
        <CarouselContent className="-ml-2">
          {dates.map((date, index) => (
            <CarouselItem
              key={index}
              className="basis-1/4 sm:basis-1/6 lg:basis-1/8 pl-2"
            >
              <Button
                variant={selectedDate === date ? "default" : "outline"}
                onClick={() => addQueryParams({ date })}
                className="p-2"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ParamsSelect;
