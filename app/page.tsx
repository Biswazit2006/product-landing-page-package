import FaqCardList from "@/components/faq-card-list";
import { FeatureCardList } from "@/components/feature-card";
import OrderForm from "@/components/order-form";
import TestimonialCarosel from "@/components/testimonial-carosel";
import { Aladin, Lemonada, Itim } from "next/font/google";
import Image from "next/image";
import * as motion from "motion/react-client";

const aladin = Aladin({ subsets: ["latin"], weight: "400" });
const lemonada = Lemonada({ subsets: ["latin"], weight: "400" });
const itim = Itim({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className=" w-full flex flex-col items-center justify-between box-border ">
      {/* Hero Sections */}
      <div className="w-full lg:py-20 px-4 lg:px-0 flex bg-[#D0CECF]/80">
        <div className="w-1/2 flex flex-col items-end justify-center ">
          <div className="flex flex-col gap-4 items-start bg-center ">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={` ${aladin.className} text-2xl lg:text-8xl`}
            >
              Perfect Watch For <br /> Perfect People.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-auto text-wrap text-xs lg:text-lg ${lemonada.className}`}
            >
              Discover Captivating Stories, Expend Your Knowledge, And <br />{" "}
              Embark On New Adventures.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={` ${itim.className} bg-white text-black text-xs lg:text-xl  py-1 lg:py-2 px-4 lg:px-8 rounded-full border border-black`}
            >
              Order Now!
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-1/2 flex justify-center items-center "
        >
          <Image
            src="/watch-hero.jpg"
            alt="watch "
            width={500}
            height={500}
            className="scale-80"
          />
        </motion.div>
      </div>
      {/* Product Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full relative py-10 lg:py-0"
      >
        <div className="w-full lg:h-full flex justify-center items-center ">
          <Image
            src="/watch-vector-bg.png"
            alt="watch "
            width={600}
            height={600}
            className="opacity-5 scale-120"
          />
        </div>
        <div className="w-full h-full flex flex-col lg:flex-row gap-0 lg:gap-4 justify-center items-center absolute top-0 left-0 px-4 lg:px-0 lg:py-50">
          <div className="w-full lg:w-1/2 h-full justify-center items-end flex flex-col">
            <div className="w-full lg:w-2/3 justify-around items-start flex flex-col gap-2 lg:gap-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-lg lg:text-4xl font-bold  ${lemonada.className}`}
              >
                Product Overview
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-xs lg:text-lg ${lemonada.className}`}
              >
                Welcome to elegant world of Reddy.Our watch is a perfect blend
                exquisite craftsmanship with timeless design,making them perfect
                accessorie for any occasion.Eatch timepiece is meticulously
                handcrafted to ensure superior quality and precision.Explore our
                collection and discover the artistry that defines us.
              </motion.p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-full justify-around items-start flex flex-col">
            <div className="w-full lg:w-2/3 h-full justify-around items-center flex flex-col">
              <ul
                className={`list-disc list-inside flex flex-col text-xs lg:text-lg gap-2 lg:gap-4 ${lemonada.className}`}
              >
                <li>
                  <span className="font-bold">Premium Materials:</span>Crafted
                  with finest materials,our watches feature high-quality
                  stainless steel cases and scrach-resistant sapphire
                  crystal,ensuring durability and longevity.
                </li>
                <li>
                  <span className="font-bold">Precision Timekeeping:</span> Our
                  are equiped with precise quartez movements or autometic
                  movements,guranteeing accurate timekeeping for the modern
                  individual.
                </li>
                <li>
                  <span className="font-bold">Elegant Design:</span>The slack
                  and minimalistic of our watches exudes sophistication and
                  class.From the slim profile to the carefully crafted
                  dials,every detail is metiqulously designed to make a
                  statement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Video Promo */}
      <div className="w-full lg:min-h-screen flex flex-col bg-[#3e3a39] items-center gap-2 lg:gap-4 py-10 lg:py-30 mt-20">
        <h3
          className={`text-white text-lg lg:text-4xl font-bold ${lemonada.className}`}
        >
          Video Promo
        </h3>
        <p
          className={`text-white ${lemonada.className} lg:w-1/2 text-center text-wrap text-xs lg:text-lg`}
        >
          Condimentum amet quam venenatis nulla sed sem lacus cursus sit.Sed
          nulla felis alliquet elementum egestas suspendisse nisl faicibus
          nulla.
        </p>
        <div className="w-3/4 lg:w-3/4 flex justify-center items-center py-10 lg:py-20">
          <iframe
            className="w-full aspect-video border-0"
            src="https://www.youtube.com/embed/HilXv4zNVkA"
            title="Wrist watch | FOSSIL | b-roll"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      {/* Testimonials */}
      <div className="w-full flex flex-col gap-10 py-10 lg:py-30 justify-center items-centers">
        <h3
          className={`w-full text-black text-xl lg:text-4xl text-center font-bold ${lemonada.className}`}
        >
          Our Customers Reviews
        </h3>
        <div className="w-full flex lg:py-10 justify-center">
          <TestimonialCarosel />
        </div>
      </div>
      {/* Features */}
      <div className="w-full min-h-screen flex flex-col bg-[#D0CECF]/80 items-center lg:gap-4 py-10 lg:py-30 mt-20">
        <h3
          className={`text-black text-xl lg:text-4xl font-bold mb-8 ${lemonada.className}`}
        >
          Feature Of Watch
        </h3>
        <div className="p-2 lg:p-0 lg:w-3/4">
          <FeatureCardList />
        </div>
      </div>
      {/* FAQ */}
      <div className="w-full flex flex-col justify-center items-center py-10 lg:py-30 ">
        <h3
          className={`text-black pb-10 text-xl lg:text-4xl font-bold ${lemonada.className}`}
        >
          Frequently Asked Questions
        </h3>
        <FaqCardList />
      </div>
      {/* Product for order */}
      <div className="w-full flex flex-col lg:flex-row bg-[#3e3a39] items-center gap-4 py-20 mt-20">
        <div className="w-full lg:w-1/2 flex justify-center items-center ">
          <Image
            src="/watch-order.jpg"
            alt="watch "
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-2 lg:gap-4 py-4 px-2 lg:px-20">
          <h4
            className={`${lemonada.className} text-white text-xl lg:text-4xl font-bold`}
          >
            Order Your Choice
          </h4>
          <p className={`${itim.className} text-white text-sm lg:text-xl`}>
            Experience the elegance and Fossil on your wrist.Place your order
            today and enjoy free worldwide shipping.
          </p>
          <p className={`${itim.className} text-white text-lg lg:text-xl`}>
            Watch Model: Fossil watch{" "}
          </p>
          <p className={`${itim.className} text-white`}>Price: $1999.99</p>
          {/* Order Form */}
          {/* order Button */}

          <button
            className={`bg-white px-15 lg:px-10 py-2 rounded-full text-md lg:text-3xl ${itim.className}`}
          >
            Order Now!
          </button>
        </div>
      </div>
      {/* Order Form */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-4 py-10 lg:py-20 lg:mt-20">
        <div className="w-full lg:w-1/2 flex justify-center items-center ">
          <OrderForm />
        </div>
        <div className="lg:w-1/2 flex justify-center items-center ">
          <Image
            src="/watch-order.jpg"
            alt="watch "
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
