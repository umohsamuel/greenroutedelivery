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
}

export function FormInputItem<T extends FieldValues>({
  input,
  form,
}: FormInputItemProps<T>) {
  const hasError = !!form.formState.errors[input.name as keyof T]?.message;
  const errorMessage = form.formState.errors[input.name as keyof T]?.message as
    | string
    | undefined;

  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
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
