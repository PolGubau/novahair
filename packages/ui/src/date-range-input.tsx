 
import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'
import { Label } from './label'
import { Popover } from './popover'
import { Button } from './button'
import { Calendar } from './calendar'
 

export const DateRangeInput = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor='dates' className='px-1' label='Range date picker'/>
      <Popover trigger={  <Button variant='outline' id='dates' className='w-full justify-between font-normal'>
            {range?.from && range?.to
              ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : 'Pick a date'}
            <ChevronDownIcon />
          </Button> }>
 
           <Calendar
            mode='range'
            selected={range}
            onSelect={range => {
              setRange(range)
            }}
          />
       </Popover>
    </div>
  )
}

 