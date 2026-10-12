import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { IDecodedUser, IRole } from "./interfaces";

export function checkAuth(
  req: NextRequest,
  allowedRoles?: IRole | IRole[],
): { user: IDecodedUser; error: null } | { user: null; error: NextResponse } {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      ),
    };
  }
  try {
    const decoded: IDecodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as unknown as IDecodedUser;

    if (allowedRoles) {
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!decoded.role || !roles.includes(decoded.role)) {
        return {
          user: null,
          error: NextResponse.json(
            { success: false, message: "Forbidden" },
            { status: 403 },
          ),
        };
      }
    }
    return { user: decoded, error: null };
  } catch {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: "Invalid Token" },
        { status: 401 },
      ),
    };
  }
}
