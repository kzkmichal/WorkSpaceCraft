import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const publicPaths = [
		"/",
		"/auth/signin",
		"/auth/signup",
		"/categories",
		"/products",
	];

	const isPublicPath = publicPaths.some(
		(publicPath) =>
			path === publicPath ||
			path.startsWith("/api/") ||
			path.startsWith("/_next/") ||
			path.startsWith("/images/") ||
			path.startsWith("/home") ||
			path.startsWith("/Home") ||
			path.startsWith("/office") ||
			path.startsWith("/Office") ||
			path.startsWith("/Remote") ||
			path.startsWith("/remote"),
	);

	if (isPublicPath) {
		return NextResponse.next();
	}

	const session = await auth();

	if (!session) {
		const signInUrl = new URL("/auth/signin", request.url);
		signInUrl.searchParams.set("callbackUrl", path);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
