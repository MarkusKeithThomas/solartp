import { Voucher } from "../type/admin/voucher";
import { apiGet, apiPost, apiPut } from "./apiClient";
import authAPI from "./authApi";

export const voucherApi = {
  validate: (code: string, orderTotal: number) =>
    authAPI.get("/vouchers/validate", {
      params: { code, orderTotal },
    }),
    getListVouchers:(): Promise<Voucher[]> => {
      return apiGet<Voucher[]>("/vouchers/get-list-voucher");
    },
    getVoucherById: (id: number): Promise<Voucher> => {
      return apiGet<Voucher>("/vouchers/get-voucher-id",{
        id 
      });
    },
    updateVoucher: (voucher: Voucher): Promise<Voucher> => {
      return apiPut<Voucher>(`/vouchers/id/${voucher.id}`, {
        code: voucher.code,
        discount: voucher.discount,
        discountType: voucher.discountType,
        minOrderValue: voucher.minOrderValue,
        maxOrderValue: voucher.maxOrderValue,
        quantity: voucher.quantity,
        used: voucher.used,
        startAt: voucher.startAt,
        endAt: voucher.endAt,
        active: voucher.active
      });
    },

    createVoucher: (voucher: Voucher): Promise<Voucher> => {
      return apiPost<Voucher>(`/vouchers/add`, {
        code: voucher.code,
        discount: voucher.discount,
        discountType: voucher.discountType,
        minOrderValue: voucher.minOrderValue,
        maxOrderValue: voucher.maxOrderValue,
        quantity: voucher.quantity,
        used: voucher.used,
        startAt: voucher.startAt,
        endAt: voucher.endAt,
        active: voucher.active
      });
    },
};