import { Card } from '@/components/ui/card'
import React from 'react'
import ProductEditor from './product-editor'

export default function page() {
  return (
    <div>
      <Card className='w-full p-2 rounded-lg'>
        <h1 className=' text-center text-foreground text-xl font-bold  font-mono'> Manage your products </h1>
      </Card>
      <ProductEditor  />
    </div>
  )
}
