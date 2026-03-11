import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {options} from "@/lib/data"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DateTimeFilter = ({dateQuery, setDateQuery}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {
            dateQuery ? options.find((option) => option.value === dateQuery)?.label : options[0].label
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setDateQuery(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    dateQuery === option.value
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />

                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default DateTimeFilter