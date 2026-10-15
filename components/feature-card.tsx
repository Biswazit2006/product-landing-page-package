import { Aladin, Bubblegum_Sans, Chicle, Hedvig_Letters_Serif, Lemonada } from "next/font/google";
import { Card } from './ui/card'
import Image from 'next/image'

const hedvig_Letters_Serif = Hedvig_Letters_Serif({ subsets: ["latin"], weight: "400" });

export default function FeatureCard({ feature }: { feature: { id: number; title: string; description: string; image: string } }) {
  return (
    <div className="w-full h-full flex flex-col justify-start  mb-6">
        <Image src={feature.image} alt={feature.title} width={400} height={200} className="aspect-video object-cover justify-self-center mb-2 rounded-md" />
        <p className={`text-md lg:text-2xl text-black mb-1 ${hedvig_Letters_Serif.className}`}>{feature.title}</p>
        <p className={`text-xs lg:text-base text-black text-wrap w-full ${hedvig_Letters_Serif.className}`}>{feature.description}</p>
    </div>
  )
}

const features = [
  {
    id: 1,
    title: "Superior Craftsmanship",
    description: "Eatch Reddy watch is meticulously carfted with pression and attention to detail,reflecting the expert watchmakers.",
    image: "/watch-feature-p1.jpg",
    },{
        id: 2,
        title: "Attention to Detail",
        description: "Every aspect of the Reddy watch showcases maticulously atteetion to details,from the finely engraved logo to the perfectly proportinoed.",
        image: "/watch-feature-p2.jpg",
    },{
        id: 3,
        title: "Elegant and Timeless Design",
        description: "The Reeddy watche features an elegant and timeless design, characterized by clean lines,minimalistic dials and a sophisticated asthetic.",
        image: "/watch-feature-p3.jpg",
    },{
        id: 4,
        title: "Comfortable Fit",
        description: "Designed with wearer comfort in mind ,the Reddy watche offers a comfortable fit on wist,making suitable for prolonged wear.",
        image: "/watch-feature-p4.jpg",
    },{
        id: 5,
        title: "Water Resistance",
        description: "The Reddy watche is water resistant,providing protection agnaist water splashes and allowing you to wear it confidently in situations.",
        image: "/watch-feature-p5.jpg",
    },{
        id: 6,
        title: "Interchangeable Straps",
        description: "Customize Your Fossil watch your personal style and mood.The watch comes with interchangebale straps,allowing you switch.",
        image: "/watch-feature-p6.jpg",
    }
]
export function FeatureCardList() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  )
}
