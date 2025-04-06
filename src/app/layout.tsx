import React from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Footer } from "@/components/modules/Footer";
import { Header } from "@/components/modules/Header";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: {
		template: "%s | WorkSpaceCraft",
		default: "WorkSpaceCraft - Curated Products for Remote Workers",
	},
	description:
		"Discover the best products for your remote and hybrid workspace setup.",
	keywords: [
		"remote work",
		"home office",
		"workspace",
		"ergonomic",
		"productivity",
	],
	authors: [{ name: "WorkSpaceCraft Team" }],
	metadataBase: new URL("https://workspacecraft.example.com"),
	creator: "WorkSpaceCraft",
	publisher: "WorkSpaceCraft",
	formatDetection: {
		email: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "WorkSpaceCraft",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "WorkSpaceCraft - Curated Products for Remote Workers",
			},
		],
	},
	// twitter: {
	// 	card: "summary_large_image",
	// 	creator: "@workspacecraft",
	// 	images: ["/images/twitter-image.jpg"],
	// },
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{
				url: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
	manifest: "/site.webmanifest",
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="h-full w-full flex-grow">
							{children}
						</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
