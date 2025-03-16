"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenericInputType<T extends FieldValues> {
  label: string;
  type: string;
  name: FieldPath<T>;
  placeholder: string;
  options?: {
    label: string;
    value: string;
  }[];
}

interface FormInputItemProps<T extends FieldValues> {
  input: GenericInputType<T>;
  form: UseFormReturn<T>;
  className?: string;
}

export function FormInputItem<T extends FieldValues>({
  input,
  form,
  className,
}: FormInputItemProps<T>) {
  const hasError = !!form.formState.errors[input.name as keyof T]?.message;
  const errorMessage = form.formState.errors[input.name as keyof T]?.message as
    | string
    | undefined;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormControl>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor={input.name} className="text-base font-light">
                {hasError ? <ErrorMsg message={errorMessage} /> : input.label}
              </label>

              {input.type === "textarea" ? (
                <Textarea
                  className="h-[145px]"
                  placeholder={input.placeholder}
                  {...field}
                />
              ) : input.type === "select" ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-[56px] w-full">
                    <SelectValue placeholder={input.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {input.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : input.type === "password" ? (
                <div className="relative">
                  <Input
                    placeholder={input.placeholder}
                    className="h-[56px] pr-14"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />

                  {showPassword ? (
                    <EyeOff
                      size={24}
                      color="#00000099"
                      className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color="#00000099"
                      className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              ) : (
                <Input
                  placeholder={input.placeholder}
                  className="h-[56px]"
                  type={input.type}
                  {...field}
                />
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

const ErrorMsg = ({ message }: { message?: string }) => {
  return <span className="text-red-500">{message}</span>;
};
