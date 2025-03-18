import "server-only";
import { ErrorResponse, ShipmentsResponse, UserResponse } from "@/types";
import { axiosInstance } from "@/utils";
import axios from "axios";
import { cookies } from "next/headers";

export async function getUserInfo() {
  const token = (await cookies()).get("token");

  try {
    const res = await axiosInstance.get<UserResponse | ErrorResponse>(
      `/auth/me`,
      {
        headers: {
          Authorization: token ? `Bearer ${token.value}` : "",
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

export async function getShipments() {
  const token = (await cookies()).get("token");

  try {
    const res = await axiosInstance.get<ShipmentsResponse | ErrorResponse>(
      `/shipments`,
      {
        headers: {
          Authorization: token ? `Bearer ${token.value}` : "",
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
