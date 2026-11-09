import { Card } from '@/components/ui/card'
import React from 'react'
import ProductEditor from './product-editor'
import Product, { IProduct } from '@/model/productModel'
import { connectDb } from '@/lib/connectMongoDb';


export default async function page() {
  connectDb();
  const product  = await Product.aggregate([
          {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          name: 1,
          price: 1,
          variants: 1,
          stock: 1,
          deliveryCharge: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      }
  ])
  console.log(product[0].variants)
  return (
    <div>
      <Card className='w-full p-2 rounded-lg'>
        <h1 className=' text-center text-foreground text-xl font-bold  font-mono'> Manage your products </h1>
      </Card>
      <ProductEditor theProduct={product[0]} />
    </div>
  )
}
