"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { IProduct } from "@/model/productModel";
import { CirclePlus, RotateCwClock, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProductEditor({ theProduct }: { theProduct:IProduct }) {
  const [product, setProduct] = useState<IProduct>(theProduct);
  const [variantInput, setVariantInput] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (data.success) {
        toast.add({
          title: "Success",
          description: "Product data submitted successfully",
          type: "success",
        });
      }

      console.log("Product data submitted successfully");
    } catch (error) {
      console.error("Error submitting product data:", error);
      toast.add({
        title: "Error",
        description: "Failed to submit product data",
        type: "error",
      });
    }
  };

  return (
    <div className="w-full p-2 rounded-lg font-mono box-border">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Product Name</FieldLabel>
            <Input
              id="product-name"
              placeholder="Product Name"
              className="w-full font-mono"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Price">Product Price</FieldLabel>
            <Input
              id="Price"
              placeholder="0.00tk"
              className="w-full font-mono"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-description">
              Product Variant
            </FieldLabel>
            <ul className="list-disc list-inside">
              {product.variants.map((variant, index) => (
                <li key={index} className="flex  gap-2 items-center">
                  {variant}
                  <Button
                    className="w-6 font-mono"
                    onClick={() => {
                      setProduct({
                        ...product,
                        variants: product.variants.filter(
                          (v, i) => i !== index,
                        ),
                      });
                      setVariantInput("");
                    }}
                  >
                    <Trash />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="w-full flex gap-2">
              <Input
                id="fieldgroup-variant"
                placeholder="Add a variant"
                className="w-3/5 font-mono"
                value={variantInput}
                onChange={(e) => setVariantInput(e.target.value)}
              />
              <Button
                className="w-2/5 font-mono px-4 py-2"
                onClick={() => {
                  if (variantInput.trim() !== "") {
                    setProduct({
                      ...product,
                      variants: [...product.variants, variantInput],
                    });
                    setVariantInput("");
                  }
                }}
              >
                Add Variant <CirclePlus />
              </Button>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-price">Delivery Charge</FieldLabel>
            <Input
              placeholder="0.00tk"
              value={product.deliveryCharge}
              onChange={(e) =>
                setProduct({
                  ...product,
                  deliveryCharge: parseFloat(e.target.value) || 0,
                })
              }
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit" className="w-full">
              Update Product
              <RotateCwClock />
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
