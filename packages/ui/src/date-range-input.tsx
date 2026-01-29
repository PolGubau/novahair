 
import { TranslationKey } from '@novahair/utils'
import i18n from '@novahair/utils/i18n/setup'
import { t } from 'i18next'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from './button'
import { Calendar } from './calendar'
import { Label } from './label'
import { Popover } from './popover'

 
export type DateRange = {
    from: Date;
    to: Date;
};
 
export type DateRangeInputProps = {
  label?: TranslationKey
  from: Date
  to: Date
  onChange: (range: DateRange) => void
}

export const DateRangeInput = ({label, from, to, onChange}: DateRangeInputProps) => {
    return (
    <div className='w-full max-w-xs space-y-2'>
    {label &&  <Label className='px-1' label={t(label)}/>}
      <Popover 
        trigger={
          <Button variant='outline' className='w-full justify-between font-normal'>
            {from && to
              ? `${from.toLocaleDateString(i18n.language)} - ${to.toLocaleDateString(i18n.language)}`
              : t('pick_date')}
            <ChevronDownIcon />
        </Button>
        }>
 
           <Calendar
            mode='range'
            selected={{ from, to }}
            onSelect={range => {
              onChange({
                from: range?.from!,
                to: range?.to!,
              })
            }}
          />
       </Popover>
    </div>
  )
}

 