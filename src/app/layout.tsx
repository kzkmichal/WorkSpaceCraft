import React from "react";
import { Inter } from "next/font/google";
import { Footer } from "@/components/common/organisms/Footer";
import { Header } from "@/components/common/organisms/Header";

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
				<div className="flex min-h-screen flex-col">
					<Header />
					<main className="container mx-auto flex-grow px-4 py-8">
						{children}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
