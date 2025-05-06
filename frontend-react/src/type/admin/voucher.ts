export interface Voucher {
  id: number;
  code: string;
  discount: number;
  discountType: "FIXED" | "PERCENT";
    minOrderValue: number;
    maxOrderValue: number;
    quantity: number;
    used: number;
    startAt: string;
    endAt: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
}

export enum discountType{
    FIXED = "FIXED",
    PERCENT = "PERCENT",
}