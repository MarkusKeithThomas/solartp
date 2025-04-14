import authAPI from "./authApi";

export const voucherApi = {
  validate: (code: string, orderTotal: number) =>
    authAPI.get("/vouchers/validate", {
      params: { code, orderTotal },
    }),
};