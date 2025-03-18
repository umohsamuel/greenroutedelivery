"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputItem } from "@/components/input";
import { signup } from "@/server/actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);

    await signup({
      email: data.email,
      password: data.password,
      name: `${data.first_name} ${data.last_name}`,
    })
      .then((res) => {
        if (res.data) {
          if (res.data.success) {
            toast.success("Signup successful");
            form.reset();
            router.push("/login");
          } else {
            toast.error(res.error || res.data.error || "Signup failed");
          }
        } else {
          toast.error(res.error ?? "An error occurred");
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <div className="grid grid-cols-2 gap-6">
          {signupArr.map((input) => (
            <FormInputItem<SignupInputs>
              key={input.name}
              input={input}
              form={form}
              className={`${input.name === "first_name" ? "col-span-1" : input.name === "last_name" ? "col-span-1" : "col-span-2"}`}
            />
          ))}
        </div>

        <Button
          disabled={isSubmitting}
          className={`h-[60px] bg-[#003F38] ${isSubmitting && "animate-pulse"}`}
        >
          <span className={`textGradient`}>
            {isSubmitting ? "..." : "Get Started"}
          </span>
        </Button>
      </form>
    </Form>
  );
}

export const signupSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type SignupInputs = z.infer<typeof signupSchema>;

export const signupArr = [
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
