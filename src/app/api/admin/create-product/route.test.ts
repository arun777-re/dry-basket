import { POST } from "@/app/api/admin/create-product/route";
import Product from "@/models/Product";
import { getValidLeafCategory, validateFields, createResponse } from "@/lib/middleware/response";
import { dbConnect } from "@/lib/db";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@/lib/db", () => ({
  dbConnect: jest.fn(),
}));

jest.mock("@/models/Product", () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue({ id: "product123" }),
  },
}));

jest.mock("uuid", () => ({
  v4: () => "mock-uuid-12345678",
}));

jest.mock("slugify", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((str) => str.toLowerCase().replace(/\s/g, "-")),
}));

jest.mock("@/lib/middleware/response", () => ({
  getValidLeafCategory: jest.fn().mockResolvedValue("valid-cat-id"),
  validateFields: jest.fn(),
  createResponse: jest.fn((data) => new Response(JSON.stringify(data), { status: data.status })),
}));

// Helper to create a mock NextRequest with formData
const createMockRequest = async (fields: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, val]) =>
    formData.append(key, typeof val === "object" ? JSON.stringify(val) : val),
  );
  const req = {
    formData: async () => formData,
  } as unknown as NextRequest;
  return req;
};

describe("POST /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a product successfully", async () => {
    const req = await createMockRequest({
      productName: "Test Product",
      description: "Test description",
      status: "active",
      category: "cat123",
      tags: ["tag1", "tag2"],
      variants: [{ size: "M", price: 100 }],
      images: ["img1.jpg", "img2.jpg"],
      isFeatured: "false",
    });

    const res = await POST(req);
    const json = await res.json();

    expect(dbConnect).toHaveBeenCalled();
    expect(validateFields).toHaveBeenCalled();
    expect(getValidLeafCategory).toHaveBeenCalledWith("cat123");
    expect(json.success).toBe(true);
    expect(json.status).toBe(201);
    expect(json.message).toMatch(/Product created successfully/);
      expect(Product.create).toHaveBeenCalledWith(expect.objectContaining({
  productName: "Test Product",
}));
  });

  it("should return 400 for missing formData", async () => {
    const req = {
      formData: async () => null,
    } as unknown as NextRequest;

    const res = await POST(req);
    const json = await res.json();

    expect(json.success).toBe(false);
    expect(json.status).toBe(400);
  });

  it("should return 400 for invalid JSON fields", async () => {
    const formData = new FormData();
    formData.append("productName", "Test");
    formData.append("description", "desc");
    formData.append("status", "active");
    formData.append("category", "cat123");
    formData.append("isFeatured", "true");
    formData.append("tags", "[invalid]"); // invalid JSON

    const req = {
      formData: async () => formData,
    } as unknown as NextRequest;

    const res = await POST(req);
    const json = await res.json();

    expect(json.success).toBe(false);
    expect(json.status).toBe(400);
    expect(json.message).toMatch(/Invalid JSON/);
  
  });
});
