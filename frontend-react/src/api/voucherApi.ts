import axiosClient from "./axiosClient";

export const voucherApi = {
  validate: (code: string, orderTotal: number) =>
    axiosClient.get("/vouchers/validate", {
      params: { code, orderTotal },
    }),
};