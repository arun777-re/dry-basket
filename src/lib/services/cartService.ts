import { Offer } from "@/models";
import { CartItem, CartProps, PopulatedCart } from "@/types/cart";
import { OfferDocument } from "@/types/offer";

type VariantProps = {
  weight: number;
  price: number;
  discount: number;
  discountExpiry: Date;
};
export interface CartItems {
  productId: string;
  categoryOfProduct: string;
  quantity: number;
  variant: VariantProps;
  addedAtPrice: number;
  subTotal: number;
}
type ApplyCouponResult =
  | { success: true; total: number; discountAmount: number }
  | { success: false; error: string };

// first case if coupon is applied and second case we are handling in cart pre to calculate variant base discount and calculate subtotal
// if coupon is applied then find categories of products which match categories of coupon then calculate discount
// and also calculate total of products who are out of coupon scope then do it same as second case in first case

export const applyCoupon = (
  coupon: OfferDocument,
  items: CartItems[],
  cartTotal: number
): ApplyCouponResult => {
  try {
    let appliesToCategories = [];
    let appliesToNotCategories = [];
    let appliesToCategoriesTotal: number = 0;
    let TotalOfNotApplicable: number = 0;

    if (
      !coupon.expiresAt ||
      new Date(coupon?.expiresAt).getTime() < Date.now()
    ) {
      return { success: false, error: "Coupon has expired" };
    }
    if (coupon.active === false) {
      return { success: false, error: "Coupon is inactive" };
    }

    // Check minimum order amount if specified
    if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
      return {
        success: false,
        error: "Cart total does not meet minimum order amount for coupon",
      };
    }

    // clean up applies to categories by removing empty or null entries
    const couponValidCategories = (coupon.appliesToCategories || []).filter(
      Boolean
    );

    const isApplicable =
      couponValidCategories.length === 0 ||
      items.some((item) =>
        couponValidCategories.includes(item.categoryOfProduct)
      );

    if (!isApplicable) {
      return { success: false, error: "Coupon is not valid" };
    }
    // first check is coupon valid or not
    if (!coupon.expiresAt) {
      return { success: false, error: "Coupon expiry date is missing" };
    }

    // handle both cases if coupon donot have any category or coupon have categories

    if (couponValidCategories && couponValidCategories.length !== 0) {
      // items on which coupon is applied

      appliesToCategories = items.filter((item) =>
        coupon?.appliesToCategories?.includes(item.categoryOfProduct)
      );
      // items on which coupon is not applied
      appliesToNotCategories = items.filter(
        (item) => !coupon?.appliesToCategories?.includes(item.categoryOfProduct)
      );
      // find total of appliesToCategories
      appliesToCategoriesTotal = appliesToCategories.reduce(
        (acc: number, item: CartItems) => {
          return acc + item.variant.price * item.quantity;
        },
        0
      );
      // find total of not applicable categories
      TotalOfNotApplicable = appliesToNotCategories.reduce(
        (acc: number, item: CartItems) => {
          if (
            item.variant.discountExpiry &&
            new Date(item.variant.discountExpiry).getTime() > Date.now()
          ) {
            const discountRate = item.variant?.discount / 100;
            const priceAfterDiscount = item.variant.price * (1 - discountRate);
            return acc + priceAfterDiscount * item.quantity;
          } else {
            return acc + item.variant.price * item.quantity;
          }
        },
        0
      );
    } else {
      appliesToCategories = [...items];
      appliesToNotCategories = [];
      appliesToCategoriesTotal = items.reduce(
        (acc: number, item: CartItems) => {
          return acc + item.variant.price * item.quantity;
        },
        0
      );
      TotalOfNotApplicable = 0;
    }

    let finalTotalOfApplicable = 0;
    let discountAmount = 0;
    // apply discount base on percentage and flat
    if (coupon.discountType === "percentage") {
      const discountRate = coupon.value / 100;
      finalTotalOfApplicable = appliesToCategoriesTotal * (1 - discountRate);
      discountAmount = (appliesToCategoriesTotal * coupon.value) / 100;
    } else if (coupon.discountType === "flat") {
      finalTotalOfApplicable = appliesToCategoriesTotal - coupon.value;
      console.log("finalTotalOfApplicable", finalTotalOfApplicable);
      discountAmount = coupon.value;
    }

    const total = finalTotalOfApplicable + TotalOfNotApplicable;
    return { success: true, total, discountAmount };
  } catch (err: any) {
    return { success: false, error: err.message || "unknown error" };
  }
};

// this utils function is used to apply coupon when is there is any update in cart

export const applyCouponInside = async (cart: CartProps) => {
  try {
    if (cart.coupon && cart.coupon?.length > 0 && cart.coupon[0]?.code) {
      const fetchCoupon = await Offer.findOne({ code: cart.coupon[0].code });

      if (
        fetchCoupon &&
        fetchCoupon.minOrderAmount <= cart.total &&
        fetchCoupon.active &&
        fetchCoupon.expiresAt > new Date()
      ) {
        if (cart.items.length > 0) {
          const result = applyCoupon(
            fetchCoupon,
            cart.items as CartItems[],
            cart.total
          );
          if (result.success) {
            cart.finalTotal = result.total;
            cart.coupon[0].discountAmount = result.discountAmount;
          }
        } else {
          // Cart empty, coupon hata do.
          cart.coupon = [];
          cart.finalTotal = cart.total;
        }
      } else {
        cart.coupon = [];
        cart.finalTotal = cart.total;
      }
    } else {
      cart.finalTotal = cart.total;
    }

    return cart;
  } catch (error) {
    console.error("Error applying coupon inside:", error);
    throw error;
  }
};



