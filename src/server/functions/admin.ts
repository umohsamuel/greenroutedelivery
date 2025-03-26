import "server-only";
import { cookies } from "next/headers";
import { axiosInstance } from "@/utils";
import { ErrorResponse, TrackShipmentResponse } from "@/types";
import axios from "axios";

export async function trackShipment(tracking_id: string) {
  const token = (await cookies()).get("token");

  try {
    const res = await axiosInstance.get<TrackShipmentResponse | ErrorResponse>(
      `/shipments/track/${tracking_id}`,
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
