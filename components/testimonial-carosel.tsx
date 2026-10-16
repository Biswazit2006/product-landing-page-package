import { Lemonada } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "/images/testimonial1.jpg",
    testimonial:
      "This product has completely transformed the way we do business. The team is incredibly responsive and the results speak for themselves.",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/images/testimonial2.jpg",
    testimonial:
      "I can't recommend this service enough. The attention to detail and commitment to excellence is unparalleled.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "/images/testimonial3.jpg",
    testimonial:
      "From start to finish, the experience has been seamless. The team is knowledgeable, professional, and truly cares about their clients.",
  },
  {
    id: 4,
    name: "Emily Davis",
    image: "/images/testimonial4.jpg",
    testimonial:
      "I was blown away by the level of service and expertise. The team went above and beyond to ensure our needs were met.",
  },
  {
    id: 5,
    name: "David Wilson",
    image: "/images/testimonial5.jpg",
    testimonial:
      "The results speak for themselves. This product has exceeded our expectations and has become an integral part of our business.",
  },
  {
    id: 6,
    name: "Sarah Thompson",
    image: "/images/testimonial6.jpg",
    testimonial:
      "I have worked with many companies in the past, but this team stands out for their professionalism and dedication to their clients.",
  },
  {
    id: 7,
    name: "James Anderson",
    image: "/images/testimonial7.jpg",
    testimonial:
      "The level of expertise and attention to detail is unmatched. I would highly recommend this service to anyone looking for top-notch results.",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    image: "/images/testimonial8.jpg",
    testimonial:
      "I have been thoroughly impressed with the quality of work and level of service provided. The team is responsive, knowledgeable, and truly cares about their clients.",
  },
  {
    id: 9,
    name: "William Taylor",
    image: "/images/testimonial9.jpg",
    testimonial:
      "The quality of work and level of service provided is exceptional. The team is professional, reliable, and delivers outstanding results.",
  },
  {
    id: 10,
    name: "Sophia Brown",
    image: "/images/testimonial10.jpg",
    testimonial:
      "I have been consistently impressed with the level of service and expertise provided. The team is responsive, knowledgeable, and truly cares about their clients.",
  },
];

const lemonada = Lemonada({ subsets: ["latin"], weight: "400" });

export default function TestimonialCarosel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full lg:w-2/3"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="basis-2/3 lg:basis-1/3 ">
            <div className="p-1 w-full h-full flex flex-col lg:gap-4 items-center justify-center">
              {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{testimonial.id}</span>
                </CardContent>
              </Card> */}
              <Card className="w-full h-full flex flex-col gap-4 items-center justify-center p-6">
                <p className={`text-center text-xs lg:text-lg ${lemonada.className}`}>{`"${testimonial.testimonial}"`}</p>
                <p className={`font-mono font-bold text-xs lg:text-lg`}>{testimonial.name}</p>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
