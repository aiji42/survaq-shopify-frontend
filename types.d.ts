declare type Foundation = {
  fieldId: string
  totalPrice: number
  closeOn: string
  supporter?: number
}

declare type Rule = {
  fieldId: string
  leadDays: number
  cyclePurchase: {
    value: 'monthly' | 'triple'
    label: string
  }
  customSchedules: Array<{
    beginOn: string
    endOn: string
    deliverySchedule: string
    purchaseSchedule: string
  }>
}

declare type Variant = {
  fieldId: string
  variantId: string
  variantName: string
  skus: { code: string; name: string; subName: string }[]
  skuSelectable: number
}

declare type Product = {
  id: string
  productCode: string
  productName: string
  variants?: Array<Variant>
  skuLabel?: string
  foundation: Foundation
  rule: Rule
}