import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./utils/cookie";

/**
 * This middleware function runs before a request is completed.
 * It checks if the user is authenticated by looking for the 'userInfo' cookie.
 */
const ensureToken = async () => {
  try {
    const res = await getCookie("userInfo");
    const response = res ? JSON.parse(res) : null;
    if (response && response.status === 200) {
      console.log("respon cookie", response);
      const userInfo = response.data.userData;
      const token = userInfo.token;
      if (!token) {
        return { token: null };
        // throw new Error("Token not available");
      }
      return userInfo;
    } else {
      return { token: null };
    }
  } catch {
    return { token: null };
    // throw error; // Re-throw for handling in middleware
  }
};
export async function middleware(request: NextRequest) {
  const userInfo = await ensureToken();
  console.log("middleware toekn", userInfo);
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!userInfo.token;
  if (isLoggedIn && (pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isLoggedIn && pathname !== "/" && !pathname.startsWith("/signin") && !pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes), _next/static (static files), _next/image (image optimization files), favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|public/images|public/).*)",
  ],
};
