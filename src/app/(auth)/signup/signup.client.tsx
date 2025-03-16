"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputItem } from "@/components/input";

export default function SignupClient() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <div className="grid grid-cols-2 gap-6">
          {loginArr.map((input) => (
            <FormInputItem<LoginInputs>
              key={input.name}
              input={input}
              form={form}
              className={`${input.name === "first_name" ? "col-span-1" : input.name === "last_name" ? "col-span-1" : "col-span-2"}`}
            />
          ))}
        </div>

        <Button className="h-[60px] bg-[#003F38]">
          <span className="textGradient">Get Started</span>
        </Button>
      </form>
    </Form>
  );
}

export const loginSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const loginArr = [
  {
    label: "First Name",
    type: "text",
    name: "first_name" as const,
    placeholder: "Your first name",
  },
  {
    label: "Last Name",
    type: "text",
    name: "last_name" as const,
    placeholder: "Your last name",
  },
  {
    label: "Email Address",
    type: "email",
    name: "email" as const,
    placeholder: "Your email address",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Your Password",
    name: "password" as const,
  },
];
