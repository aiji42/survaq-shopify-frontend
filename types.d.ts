declare type Foundation = {
  fieldId: string;
  totalPrice: number;
  closeOn: string;
  supporter: number;
};

declare type Rule = {
  fieldId: string;
  customSchedules: Array<{
    beginOn: string;
    endOn: string;
    deliverySchedule: string;
  }>;
  schedule: Schedule;
};

declare type Schedule = {
  year: number;
  month: number;
  term: "early" | "middle" | "late";
  text: string;
  subText: string;
  texts: string[];
};

declare type Variant = {
  fieldId: string;
  variantId: string;
  variantName: string;
  skus: { code: string; name: string; subName: string }[];
  skuSelectable: number;
};

declare type Product = {
  id: string;
  productCode: string;
  productName: string;
  variants?: Array<Variant>;
  skuLabel?: string;
  foundation: Foundation;
  rule: Rule;
};
