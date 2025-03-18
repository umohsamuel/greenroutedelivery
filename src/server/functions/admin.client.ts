import { AShipmentResponse, ErrorResponse, PaymentStatus } from "@/types";
import { axiosInstance } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";

interface UpdateAmountInputs {
  amount: number;
}

export async function updateAmount(id: string, data: UpdateAmountInputs) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.put<AShipmentResponse | ErrorResponse>(
      `/admin/shipments/${id}/amount`,
      data,
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

interface UpdatePaymentStatusInputs {
  paymentStatus: PaymentStatus;
}

export async function updatePaymentStatus(
  id: string,
  data: UpdatePaymentStatusInputs
) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.put<AShipmentResponse | ErrorResponse>(
      `/admin/shipments/${id}/payment`,
      data,
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
