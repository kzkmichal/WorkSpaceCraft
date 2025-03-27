import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

const PUBLIC_PATHS = [
	"/",
	"/auth/signin",
	"/auth/signup",
	"/categories",
	"/products",
	"/_next",
	"/api",
	"/images",
	"/favicon.ico",
];

const CATEGORY_PATHS = [
	"/home",
	"/Home",
	"/office",
	"/Office",
	"/Remote",
];

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath =
		PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath)) ||
		CATEGORY_PATHS.some((categoryPath) =>
			path.startsWith(categoryPath),
		);

	if (isPublicPath) {
		return NextResponse.next();
	}

	if (path.startsWith("/admin")) {
		const session = await auth();

		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.redirect(
				new URL("/?access=denied", request.url),
			);
		}

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
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico).*)",
		"/admin/:path*",
	],
};
