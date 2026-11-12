"use client";
import { Lemonada } from "next/font/google";
import { Itim } from "next/font/google";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { toast } from "./ui/toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle2Icon, InfoIcon, LoaderIcon } from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const lemonada = Lemonada({ subsets: ["latin"], weight: "400" });
const itim = Itim({ subsets: ["latin"], weight: "400" });

export default function OrderForm() {
  const [open, setOpen] = useState(false);
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
    website_url: "",
  });
  const [page, setPage] = useState<{
    isLoading: boolean;
    error: string | null;
    message: string | null;
    success: boolean | null;
  }>({
    isLoading: false,
    error: null,
    success: null,
    message: null,
  });

  const [deviceId, setDeviceId] = useState<string>("");

  const handleSubmitOrder = async () => {
    setPage({ isLoading: true, error: null, message: null, success: null });
    const datapayload = new FormData();
    datapayload.append("name", formData.name);
    datapayload.append("phone", formData.phone);
    datapayload.append("district", formData.district);
    datapayload.append("email", formData.email);
    datapayload.append("address", formData.address);
    datapayload.append("variant", formData.variant);
    datapayload.append("website_url", formData.website_url);
    datapayload.append("deviceId", deviceId);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: datapayload,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.add({
          title: "Success",
          description: "Order placed successfully.",
          type: "success",
        });
        setPage({
          isLoading: false,
          error: null,
          message: data.message,
          success: true,
        });
      } else {
        toast.add({
          title: "Error",
          description: "Failed to place order.",
          type: "error",
        });
        setPage({
          isLoading: false,
          error: data.message,
          message: null,
          success: false,
        });
      }
    } catch (error) {
      setPage({
        isLoading: false,
        error: "An error occurred while submitting the order.",
        message: null,
        success: false,
      });
      console.error("Error submitting order:", error);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.district === "" ||
      formData.address === ""||
      formData.variant === ""
    ) {
      toast.add({
        title: "Error",
        description: "Please fill all the fields before proceeding.",
        type: "error",
      });
      return;
    }

    setOpen(open);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    const getFingerprint = async () => {
      try{
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceId(result.visitorId);
      }catch(error){
        console.log(error)
      }
    }
    getFingerprint();
  },[])

  return (
    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-2 lg:gap-4 px-4 lg:px-20">
      <h4
        className={`${lemonada.className} text-black text-xl lg:text-4xl font-bold`}
      >
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
      <RadioGroup
        defaultValue="Red"
        className={`w-fit ${itim.className} text-lg`}
        onValueChange={(value) =>
          setFormData((prevData) => ({
            ...prevData,
            variant: value,
          }))
        }
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="red" id="r1" className="border-red-500 " />
          <Label htmlFor="r1" className="text-red-500">
            Red
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="golden Rose"
            id="r2"
            className="border-[#a1979c]  "
          />
          <Label htmlFor="r2" className="text-[#D0CECF]">
            Golden Rose
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value="pale Grey"
            id="r3"
            className="border-[#3b2322]"
          />
          <Label htmlFor="r3" className="text-[#3b2322]">
            Pale Grey
          </Label>
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
        <Field className="hidden" >
          <Input
            id="website_url"
            placeholder="Website URL"
            onChange={handleInputChange}
            name="website_url"
            value={formData.website_url}
            className="text-black placeholder:text-black hidden"
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
        <DrawerTrigger
          render={
            <button
              className={`bg-[#D0CECF] text-black w-full lg:w-auto lg:px-10 py-2 lg:py-2 rounded-full lg:text-2xl ${itim.className}`}
            >
              Order Now!
            </button>
          }
        />
        <DrawerContent className="w-sm h-2/3 lg:h-full lg:w-lg ">
          <DrawerHeader>
            <DrawerTitle className={`${itim.className} text-xl`}>
              Order Summary
            </DrawerTitle>
          </DrawerHeader>
          <div className=" flex flex-col gap-4 p-4 lg:m-4 font-mono text-md lg:text-lg">
            <p>Name: {formData.name}</p>
            <p>Phone: {formData.phone}</p>
            <p>District: {formData.district}</p>
            <p>Email: {formData.email}</p>
            <p>Address: {formData.address}</p>
            <hr className="border-t border-gray-300" />
            <p>
              Product: {formData.productName} -{formData.variant + " Strap"}
            </p>
            <div className="flex justify-between">
              <p>Item Total({formData.quantity}):</p>
              <p>{formData.total}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>$0.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>total: ${formData.total}</p>
              <p>$0.00</p>
            </div>
            <div className="grid w-full max-w-md items-start gap-4">
              {page.success && (
                <Alert variant="default" className="text-green-600">
                  <CheckCircle2Icon className="" />
                  <AlertTitle>successfull</AlertTitle>
                  <AlertDescription className="text-green-600">
                    {page.message}
                  </AlertDescription>
                </Alert>
              )}
              {page.error && (
                <Alert variant="destructive">
                  <InfoIcon />
                  <AlertTitle>Try again!</AlertTitle>s
                  <AlertDescription>
                    {page.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <Button disabled={page.isLoading} onClick={handleSubmitOrder}>
              {page.isLoading ?  <LoaderIcon
      role="status"
      aria-label="Loading"
      className={"size-4 animate-spin"}
    /> : "Place Order"}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
