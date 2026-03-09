import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Plus } from 'lucide-react'

const AddTask = () => {
  return (
    <Card className='p-6 border-0'>
        <div className='flex flex-col gap-3 sm:flex-row'>
            <Input type="text" placeholder="To do...." className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20' />
        
            <Button variant='gradient' size='xl' className='px-6'> 
                <Plus className='size-5'/> Thêm
            </Button>
        </div>

    </Card>
  )
}

export default AddTask