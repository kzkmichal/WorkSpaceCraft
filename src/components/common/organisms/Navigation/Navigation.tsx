"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const Navigation = () => {
	const { data: session, status } = useSession();
	const isLoading = status === "loading";

	return (
		<nav className="bg-white shadow">
			<div className="container mx-auto px-6 py-4">
				<div className="flex justify-between">
					<div>
						<Link href="/" className="text-xl font-bold">
							WorkSpaceCraft
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Link href="/products" className="hover:text-blue-600">
							Products
						</Link>

						{isLoading ? (
							<span>Loading...</span>
						) : session ? (
							<>
								<Link href="/profile" className="hover:text-blue-600">
									Profile
								</Link>
								<button
									onClick={() => signOut()}
									className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
								>
									Sign Out
								</button>
							</>
						) : (
							<Link
								href="/auth/signin"
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
