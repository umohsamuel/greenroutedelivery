"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputItem } from "@/components/input";

export default function LoginClient() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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
        <div className="flex flex-col gap-6">
          {loginArr.map((input) => (
            <FormInputItem<LoginInputs>
              key={input.name}
              input={input}
              form={form}
            />
          ))}
        </div>

        <p className="secondaryGradient mt-2 text-center text-base font-normal">
          Forgot Password?
        </p>

        <Button className="h-[60px] bg-[#003F38]">
          <span className="textGradient">Log In</span>
        </Button>
      </form>
    </Form>
  );
}

export const loginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const loginArr = [
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
