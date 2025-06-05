import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "./response";

import jwt from "jsonwebtoken";
import Agent from "@/models/AgentSchema";
import User from "@/models/User";
import { UserProps } from "@/types/user";


const secret = process.env.JWT_SECRET || "";

interface CustomReq extends NextRequest {
  admin?: any;
  user?: any;
}

type verifyUserResult = {user:UserProps,response:NextResponse | null};

export async function verifyAdminToken(req: CustomReq) {
  try {
    // get token from the cookies
    const token: string | undefined = req.cookies.get("adminToken")?.value;

    if (!token) {
      return createResponse({
        success: false,
        status: 401,
        message: "You are not authenticate, login/signup first",
      });
    }

    const verify = await verifyToken(token);

    if (!verify || !verify._id) {
      return createResponse({
        success: false,
        status: 401,
        message: "You are not authenticate, login/signup first",
      });
    }

    const admin = await Agent.findById(verify._id);

    if (!admin) {
      return createResponse({
        success: false,
        status: 401,
        message: "Admin not found.",
      });
    }
    return admin;
  } catch (error) {
    return createResponse({
      success: false,
      status: 401,
      message: "Invalid or expired token",
    });
  }
}

// middleware to verify user access token
export const verifyUserToken = async (req: CustomReq):Promise<verifyUserResult | NextResponse> => {
  try {
    const token = req.cookies.get("accessToken")?.value;

    // If no access token is provided, try the refresh token
    if (!token) {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (!refreshToken) {
        throw new Error("refresh token is not available login/signup again");
      }

      // Verify the refresh token
      const decodedRefresh = await verifyToken(refreshToken);

      // Find the user based on the decoded ID from the refresh token
      const user = await User.findById(decodedRefresh.id);
      if (!user) {
        throw new Error("user not found");
      }

      // Generate new access token and refresh token
      const newAccessToken = jwt.sign({ id: user._id }, secret, {
        expiresIn: "1h",
      });
      const newRefreshToken = jwt.sign({ id: user._id }, secret, {
        expiresIn: "7d",
      });

      req.user = user;
      const response = createResponse({
        success:true,
        status:200,
        message:'Token Refreshed'
      });

      response.cookies.set('accessToken',newAccessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge:2 * 60 * 60
      })
      response.cookies.set('refreshToken',newRefreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60
      })
      return {user,response:null};
    }

    // Verify the access token
    const decoded = await verifyToken(token);

    // Find the user based on the decoded ID from the access token
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User Not Found");
    }

    // Update the user's active status
    user.isActive = true;
    await user.save();

    // Set user in request and proceed
    req.user = user;
    return {user,response:null};
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Token verification error", error.message);
    }
    if (error.name === "TokenExpiredError") {
      return createResponse({
        message: "Token Expired",
        success: false,
        status: 401,
      });
    } else if (error.name === "JsonWebTokenError") {
      return createResponse({
        message: "Json web token Error",
        success: false,
        status: 401,
      });
    } else {
      return createResponse({
        message: "Internal Server Error",
        success: false,
        status: 401,
      });
    }
  }
};
// helper function to verify jwt

const verifyToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    if (!token) {
      reject(new Error("No Token provided"));
      return;
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
