"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebarProps } from "./types";

export const AdminSidebar = ({}: AdminSidebarProps) => {
	const pathname = usePathname();

	const links = [
		{ href: "/admin", label: "Dashboard" },
		{ href: "/admin/users", label: "Users" },
		{ href: "/admin/products", label: "Products" },
		{ href: "/admin/categories", label: "Categories" },
		{ href: "/admin/subcategories", label: "Subcategories" },
	];

	return (
		<div className="min-h-screen w-64 bg-gray-800 p-4 text-white">
			<h1 className="mb-8 text-xl font-bold">Admin Panel</h1>
			<nav className="space-y-2">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`block rounded px-4 py-2 ${
							pathname === link.href
								? "bg-blue-700 text-white"
								: "text-gray-300 hover:bg-gray-700"
						}`}
					>
						{link.label}
					</Link>
				))}
			</nav>
			<div className="mt-8 border-t border-gray-700 pt-4">
				<Link
					href="/"
					className="block rounded px-4 py-2 text-gray-300 hover:bg-gray-700"
				>
					Back to Site
				</Link>
			</div>
		</div>
	);
};
