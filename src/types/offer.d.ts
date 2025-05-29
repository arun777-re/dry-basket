// types/offer.d.ts
import { Document } from 'mongoose';

export interface OfferDocument extends Document {
  code: string;
  description?: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrderAmount?: number;
  appliesToCategories?: string[];
  expiresAt?: Date;
  usageLimit: number;
  timesUsed: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
