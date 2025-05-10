"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormItem } from "./ui/form";
import { FormControl, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";



interface RadioGroupWithOtherProps<T extends FieldValues> {
  field: ControllerRenderProps<T>,
  options: string[],
  otherLabel?: string,
}


export default function RadioGroupWithOther<T extends FieldValues>({
  field,
  options,
  otherLabel = "その他"
}: RadioGroupWithOtherProps<T>) {
  const [otherValue, setOtherValue] = useState("");
  const isOtherSelected = (!options.includes(field.value) && field.value != "");

  useEffect(() => {
    if (isOtherSelected) {
      setOtherValue(field.value);
    }

  }, [field, isOtherSelected, otherValue])


  console.log({ field, isOtherSelected });

  return (
    <>
      <RadioGroup
        {...field}
        onValueChange={field.onChange}
        value={isOtherSelected ? otherLabel : field.value}
        className="space-y-3"
      >
        {options.map((option) => (
          <FormItem key={option} className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value={option} id={option} />
            </FormControl>
            <FormLabel
              htmlFor={option}
              className="text-lg font-normal text-tshirt-text"
            >
              {option}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>

      {(field.value == otherLabel || isOtherSelected) && (
        <Textarea
          value={otherValue}
          onChange={(e) => {
            setOtherValue(e.target.value)
            field.onChange(e.target.value)
          }}
          placeholder="Type your answer here..."
          className="mt-3 w-full h-32"
        />
      )}
    </>
  )
}