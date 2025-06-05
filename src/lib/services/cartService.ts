import { CartProps } from "@/types/cart";
import { ProductDocument } from "@/types/product";
import { OfferDocument } from "@/types/offer";


export function calculateCartTotals({items, coupon}:{items:ProductDocument[],coupon:string}) {
  let total = 0;
  let finalTotal = 0;

  const applicableItems:ProductDocument[] = [];
  const nonApplicableItems:ProductDocument[] = [];

  items.forEach(item => {
    const discountRate = item.variants.discount ? item.variant.discount / 100 : 0;
    const priceAfterDiscount = item.productId.price * (1 - discountRate);
    const itemSubtotal = priceAfterDiscount * item.quantity;

    total += itemSubtotal;

    if (coupon && coupon.appliesToCategories?.includes(item.productId.category)) {
      applicableItems.push(itemSubtotal);
    } else {
      nonApplicableItems.push(itemSubtotal);
    }
  });

  const applicableTotal = applicableItems.reduce((a, b) => a + b, 0);
  const nonApplicableTotal = nonApplicableItems.reduce((a, b) => a + b, 0);

  let finalApplicableTotal = applicableTotal;

  if (coupon) {
    if (coupon.discountType === "flat") {
      finalApplicableTotal -= coupon.value;
    } else {
      finalApplicableTotal *= (1 - coupon.value / 100);
    }
  }

  finalTotal = finalApplicableTotal + nonApplicableTotal;

  return { total, finalTotal };
}
