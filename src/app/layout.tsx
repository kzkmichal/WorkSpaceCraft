import React from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Footer } from "@/components/common/organisms/Footer";
import { Header } from "@/components/common/organisms/Header";
import "../styles/globals.css";
import { Navigation } from "@/components/common/organisms/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "WorkSpaceCraft",
	description:
		"Curated collection of products for remote and hybrid workers",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<Navigation />
						<Header />
						<main className="container mx-auto h-full flex-grow px-4 py-8">
							{children}
						</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
