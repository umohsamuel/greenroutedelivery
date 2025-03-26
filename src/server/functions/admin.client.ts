import {
  AllShipmentsResponse,
  AllUsersResponse,
  AShipmentResponse,
  DeliveryStatus,
  ErrorResponse,
  PaymentStatus,
} from "@/types";
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

interface UpdateShipmentStatusInputs {
  status: DeliveryStatus;
}

export async function updateShipmentStatus(
  id: string,
  data: UpdateShipmentStatusInputs
) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.put<AShipmentResponse | ErrorResponse>(
      `/admin/shipments/${id}/status`,
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

export async function deleteShipment(id: string) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.delete<AShipmentResponse | ErrorResponse>(
      `/admin/shipments/${id}`,
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

export async function getAllShipments(page?: number, limit?: number) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.get<AllShipmentsResponse | ErrorResponse>(
      `/admin/shipments`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          limit,
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

export async function getAllUsers(
  page?: number,
  limit?: number,
  name?: string
) {
  const token = Cookies.get("token");

  try {
    const res = await axiosInstance.get<AllUsersResponse | ErrorResponse>(
      `/admin/users`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params: {
          page,
          limit,
          name,
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
