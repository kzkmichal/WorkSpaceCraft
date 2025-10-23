export const breadcrumbsRoutes = {
	PRODUCTS: "products",
	CATEGORIES: "categories",
	PROFILE: "profile",
	ARTICLES: "articles",
	HOME: "home",
	REMOTE: "remote",
	OFFICE: "office",
	SETUP: "setup",
	SETUPS: "setups",
} as const;

export const hiddenPaths = {
	AUTH_SIGNIN: "/auth/signin",
	AUTH_SIGNUP: "/auth/signup",
	ROOT: "/",
} as const;

export const routeLabels: Record<string, string> = {
	products: "Products",
	categories: "Categories",
	profile: "Profile",
	admin: "Admin Panel",
	users: "Users",
	auth: "Authentication",
	signin: "Sign In",
	signup: "Sign Up",
	add: "Add New",
	edit: "Edit",
	tags: "Tags",
	setup: "Setups",
	setups: "Setups",
	articles: "Articles",
	home: "Home Office",
	remote: "Remote Work",
	office: "Office Setup",
};
