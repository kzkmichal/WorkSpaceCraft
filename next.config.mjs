/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		DB_USER: process.env.DB_USER,
		DB_HOST: process.env.DB_HOST,
		DB_NAME: process.env.DB_NAME,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_PORT: process.env.DB_PORT,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				hostname: "*.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
