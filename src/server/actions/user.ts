"use server";

import {
  Address,
  AddShipmentResponse,
  ErrorResponse,
  PackageDetails,
  ShipmentType,
} from "@/types";
import { axiosInstance } from "@/utils";
import axios from "axios";
import { cookies } from "next/headers";

export interface AddShipmentInputs {
  shipmentType: ShipmentType;
  packageDetails: PackageDetails;
  destination: Address;
  source: Address;
}

export async function createShipment(data: AddShipmentInputs) {
  const token = (await cookies()).get("token");

  try {
    const res = await axiosInstance.post<AddShipmentResponse | ErrorResponse>(
      `${process.env.BASEURL}/shipments`,
      data,
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
