import { AShipmentResponse, ErrorResponse } from "@/types";
import { axiosInstance } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";

export async function getAShipment(id: string) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.get<AShipmentResponse | ErrorResponse>(
      `/shipments/${id}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
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
