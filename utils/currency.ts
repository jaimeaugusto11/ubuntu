// ================================
// utils/currency.ts
// ================================
export const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  });
