// src/constants/index.ts

export const ROUTES = {
	HOME: "/",
	PRODUCTS: "/products",
	PRODUCT: (id: string) => `/products/${id}`,
	SETUPS: "/setups",
	SETUP: (id: string) => `/setups/${id}`,
	ARTICLES: "/articles",
	ARTICLE: (id: string) => `/articles/${id}`,
	AUTH: {
		SIGNIN: "/auth/signin",
		SIGNUP: "/auth/signup",
		PROFILE: "/auth/profile",
	},
} as const;

export const API_ENDPOINTS = {
	GRAPHQL: "/api/graphql",
	AUTH: "/api/auth",
} as const;

export const BREAKPOINTS = {
	xs: 360,
	sm: 480,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

export const TRANSITIONS = {
	DEFAULT: "all 0.3s ease",
	FAST: "all 0.15s ease",
	SLOW: "all 0.5s ease",
} as const;

export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const QUERY_KEYS = {
	PRODUCTS: "products",
	SETUPS: "setups",
	ARTICLES: "articles",
	USER: "user",
} as const;
