"use client";
import { Lemonada } from "next/font/google";
import { Itim } from "next/font/google";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { toast } from "./ui/toast";


const lemonada = Lemonada({ subsets: ["latin"], weight: "400" });
const itim = Itim({ subsets: ["latin"], weight: "400" });

export default function OrderForm() {

  const [open, setOpen] = useState(false)
  const [deliveryTime, setDeliveryTime] = useState("asap")
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    email: "",
    address: "",
    variant: "",
    productName: "Fossil watch",
    total: 1999.99,
    quantity: 1,
  })
      const onOpenChange = (open: boolean) => {
        if(formData.name === "" || formData.phone === "" || formData.district === "" || formData.address === ""){
          toast.add({
            title: "Error",
            description: "Please fill all the fields before proceeding.",
            type: 'error',
          })
          return;
        }

    setOpen(open);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-2 lg:gap-4 px-4 lg:px-20">
      <h4 className={`${lemonada.className} text-black text-xl lg:text-4xl font-bold`}>
        Order Now
      </h4>
      <p className={`${itim.className} text-black text-xs lg:text-lg`}>
        Experience the elegance and Fossil on your wrist.Place your order today
        and enjoy free worldwide shipping.
      </p>
      <p className={`${itim.className} text-black`}>
        Watch Model: Fossil watch{" "}
      </p>
      <p className={`${itim.className} text-black`}>Price: $1999.99</p>
      {/* Order Form */}
         <RadioGroup defaultValue="Red" className={`w-fit ${itim.className} text-lg`} onValueChange={(value) => setFormData((prevData) => ({
        ...prevData,
        variant: value
      }))}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="red" id="r1" className="border-red-500 " />
        <Label htmlFor="r1" className="text-red-500">Red</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="golden Rose" id="r2" className="border-[#a1979c]  "/>
        <Label htmlFor="r2" className="text-[#D0CECF]">Golden Rose</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="pale Grey" id="r3" className="border-[#3b2322]" />
        <Label htmlFor="r3" className="text-[#3b2322]">Pale Grey</Label>
      </div>
    </RadioGroup>
      {/* Order Button */}

      <FieldGroup className={`grid max-w-xl grid-cols-2 ${itim.className} `}>
        <Field>
          {/* <FieldLabel htmlFor="first-name">First Name</FieldLabel> */}
          <Input
            id="name"
            placeholder="Name"
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            className="text-black placeholder:text-black "
          />
        </Field>
        <Field>
          <Input
            id="phone"
            placeholder="Phone"
            onChange={handleInputChange}
            name="phone"
            value={formData.phone}
            className="text-black placeholder:text-black"
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid max-w-xl grid-cols-2">
        <Field>
          <Input
            id="district"
            placeholder="District"
            onChange={handleInputChange}
            name="district"
            value={formData.district}
            className="text-black placeholder:text-black"
          />
        </Field>
        <Field>
          <Input
            id="last-name"
            placeholder="email"
            onChange={handleInputChange}
            name="email"
            value={formData.email}
            className="text-black placeholder:text-black"
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid max-w-xl ">
        <Field>
          <Input
            id="last-name"
            placeholder="Address"
            onChange={handleInputChange}
            name="address"
            value={formData.address}
            className="text-black placeholder:text-black"
          />
        </Field>
      </FieldGroup>
      {/* order Button */}


      {/* Drawer */}
      <Drawer
      open={open}
      onOpenChange={onOpenChange}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={      <button
        className={`bg-[#D0CECF] text-black px-10 py-2 rounded-full text-2xl ${itim.className}`}
      >
        Order Now!
      </button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={`${itim.className}`}>Order Summary</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 m-4 font-mono">
          <p>Name: {formData.name}</p>
          <p>Phone: {formData.phone}</p>
          <p>District: {formData.district}</p>
          <p>Email: {formData.email}</p>
          <p>Address: {formData.address}</p>
          <hr className="border-t border-gray-300" />
          <p>Product: {formData.productName} -{formData.variant + " Strap"}</p>
          <p className="flex justify-between"><span>Item Total({formData.quantity}): <span>{formData.total}</span></span></p>
          <p className="flex justify-between"><span>Shipping: <span>$0.00</span></span></p>
          <hr />
          <p>total: ${formData.total}</p>
        </div>
      </DrawerContent>
    </Drawer>
    </div>
  );
}
