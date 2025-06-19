import { POST } from "./route";
import Cart from "@/models/Cart";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import { cartRequestSchema } from "@/lib/validators/cartValidators";
import { createResponse, handleError } from "@/lib/middleware/response";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@/models/Cart");
jest.mock("@/lib/middleware/verifyToken");
jest.mock("@/lib/validators/cartValidators");
jest.mock("@/lib/middleware/response", () => {
  const actual = jest.requireActual("@/lib/middleware/response");
  return {
    ...actual,
    createResponse: jest.fn(),
    handleError: jest.fn(),
  };
});
jest.mock("@/lib/db", () => ({ dbConnect: jest.fn() }));

const mockRequest = (body: any) =>
  new NextRequest("http://localhost:3000/api/public/cart/add-to-cart", {
    method: "POST",
    body: JSON.stringify(body),
  });

describe("POST /add-to-cart", () => {
  const userId = "mockUserId";
  const mockValidatedBody = {
    items: [{ productId: "prod1", quantity: 2 }],
    coupon: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (verifyUserToken as jest.Mock).mockResolvedValue(true);
    (cartRequestSchema.validate as jest.Mock).mockResolvedValue(mockValidatedBody);
  });

  it("should update existing cart", async () => {
    const mockCart = {
      items: [],
      coupan: [],
      save: jest.fn(),
    };

    (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);

    const req = mockRequest(mockValidatedBody);
    (req as any).user = { _id: userId };

    await POST(req);

    expect(Cart.findOne).toHaveBeenCalledWith({ userId });
    expect(mockCart.items).toEqual(mockValidatedBody.items);
    expect(mockCart.coupan).toEqual(mockValidatedBody.coupon);
    expect(mockCart.save).toHaveBeenCalled();
    expect(createResponse).toHaveBeenCalledWith({
      status: 200,
      message: "Items added successfully",
      success: true,
    });
  });

  it("should create a new cart if none exists", async () => {
    (Cart.findOne as jest.Mock).mockResolvedValue(null);
    (Cart.create as jest.Mock).mockResolvedValue({});

    const req = mockRequest(mockValidatedBody);
    (req as any).user = { _id: userId };

    await POST(req);

    expect(Cart.create).toHaveBeenCalledWith({
      items: mockValidatedBody.items,
      userId,
      coupon: mockValidatedBody.coupon,
    });
    expect(createResponse).toHaveBeenCalledWith({
      status: 201,
      message: "Cart Created successfully",
      success: true,
    });
  });

  it("should handle errors correctly", async () => {
    const error = new Error("Test Error");
    (Cart.findOne as jest.Mock).mockRejectedValue(error);

    const req = mockRequest(mockValidatedBody);
    (req as any).user = { _id: userId };

    await POST(req);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it("should handle token validation failure", async () => {
    const mockNextResponse = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    (verifyUserToken as jest.Mock).mockResolvedValue(mockNextResponse);

    const req = mockRequest(mockValidatedBody);

    const res = await POST(req);
    expect(res).toBe(mockNextResponse);
  });
});
