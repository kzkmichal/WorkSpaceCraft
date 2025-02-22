import React from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Footer } from "@/components/modules/Footer";
import { Header } from "@/components/modules/Header";
import "../styles/globals.css";

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
