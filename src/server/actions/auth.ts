"use server";

import { ErrorResponse, LoginResponse, SignupResponse } from "@/types/auth";
import { cookies } from "next/headers";

import axios from "axios";

interface LoginInputs {
  email: string;
  password: string;
}

export async function login(data: LoginInputs) {
  try {
    const res = await axios.post<LoginResponse | ErrorResponse>(
      `${process.env.BASEURL}/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      const token = res.data.token;
      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return { error: null, data: res.data };
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      return {
        error: e.response?.data?.error || "An error occurred.",
        data: null,
      };
    }

    return { error: "An error occurred.", data: null };
  }
}

interface SignupInputs {
  name: string;
  email: string;
  password: string;
}

export async function signup(data: SignupInputs) {
  try {
    const res = await axios.post<SignupResponse | ErrorResponse>(
      `${process.env.BASEURL}/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { error: null, data: res.data };
  } catch (e) {
    console.error(e);

    if (axios.isAxiosError(e)) {
      return {
        error: e.response?.data?.error || "An error occurred.",
        data: null,
      };
    }

    return { error: "An error occurred.", data: null };
  }
}
