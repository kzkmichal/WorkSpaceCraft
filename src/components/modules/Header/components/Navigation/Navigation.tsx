"use client";
import { useState } from "react";
import {
	Search,
	ShoppingCart,
	User,
	Menu,
	X,
	UserCheck,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Container } from "@/components/common/molecules";
import { Button } from "@/components/common/atoms";
import { BaseProps } from "@/components/utils/types";

export type NavigationProps = BaseProps;

const categories = [
	{
		id: "home",
		title: "Home",
		subcategories: [
			"Furniture",
			"Health",
			"Tech",
			"Storage",
			"Lighting",
			"Decor",
			"Ergonomics",
			"Cables",
			"Air Quality",
			"Plants",
		],
	},
	{
		id: "office",
		title: "Office",
		subcategories: [
			"Furniture",
			"Collaboration",
			"Tech",
			"Meeting Rooms",
			"Acoustics",
			"Storage",
			"Desks",
			"Chairs",
			"Lighting",
		],
	},
	{
		id: "remote",
		title: "Remote",
		subcategories: [
			"Bags",
			"Portable Tech",
			"Accessories",
			"Travel Gear",
			"Mobile Workstation",
			"Connectivity",
			"Power",
			"Security",
		],
	},
];

const SubcategoriesGrid = ({
	subcategories,
}: {
	subcategories: string[];
}) => {
	const chunks = [];
	for (let i = 0; i < subcategories.length; i += 5) {
		chunks.push(subcategories.slice(i, i + 5));
	}

	return (
		<div className="flex space-x-16">
			{chunks.map((chunk, columnIndex) => (
				<div key={columnIndex} className="flex flex-col space-y-3">
					{chunk.map((subcategory) => (
						<a
							key={subcategory}
							href={`/categories/${subcategory.toLowerCase()}`}
							className="text-sm font-light text-gray-600 transition-colors hover:text-gray-900"
						>
							{subcategory}
						</a>
					))}
					{[...Array<undefined>(5 - chunk.length)].map((_, index) => (
						<div key={`empty-${index}`} className="h-[24px]" />
					))}
				</div>
			))}
		</div>
	);
};

export const Navigation = ({
	"data-testid": testId = "navigation",
}: NavigationProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState<{
		id: string;
		subcategories: string[];
	} | null>(null);
	const [showCategories, setShowCategories] = useState(false);
	const { data: session, status } = useSession();
	const isLoading = status === "loading";

	return (
		<Container
			className="bg-white"
			data-testid={testId}
			paddingX="none"
			paddingY={"none"}
			as={"nav"}
			size="2xl"
		>
			{/* Main Navigation */}
			<div className="relative border-b border-gray-100">
				<div className="">
					<div className="flex h-20 items-center justify-between">
						{/* Logo */}
						<a
							href="/"
							className="text-2xl tracking-wide text-gray-900"
						>
							WorkSpaceCraft
						</a>

						{/* Desktop Navigation */}
						<div className="hidden items-center space-x-8 md:flex">
							<button
								onMouseEnter={() => setShowCategories(true)}
								className="text-sm font-light text-gray-600 hover:text-gray-900"
							>
								Categories
							</button>
							<a
								href="/setups"
								className="text-sm font-light text-gray-600 hover:text-gray-900"
							>
								Setups
							</a>
							<a
								href="/community"
								className="text-sm font-light text-gray-600 hover:text-gray-900"
							>
								Community
							</a>
							<a
								href="/guides"
								className="text-sm font-light text-gray-600 hover:text-gray-900"
							>
								Guides
							</a>
						</div>

						{/* Icons */}
						<div className="flex items-center space-x-6">
							<button className="text-gray-600 hover:text-gray-900">
								<Search className="h-5 w-5" />
							</button>
							{isLoading ? (
								<span>Loading...</span>
							) : session ? (
								<>
									<Link href="/profile">
										<User className="h-5 w-5" />
									</Link>
									<Button
										onClick={() => signOut()}
										variant="secondary"
									>
										<UserCheck className="h-5 w-5" />
									</Button>
								</>
							) : (
								<Link href="/auth/signin">
									<User className="h-5 w-5" />
								</Link>
							)}
							<button className="text-gray-600 hover:text-gray-900">
								<ShoppingCart className="h-5 w-5" />
							</button>

							<button
								className="block md:hidden"
								onClick={() => setIsOpen(!isOpen)}
							>
								{isOpen ? (
									<X className="h-6 w-6 text-gray-600" />
								) : (
									<Menu className="h-6 w-6 text-gray-600" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Categories Dropdown */}
				{showCategories && (
					<div
						className="absolute left-0 right-0 bg-white shadow-lg"
						onMouseLeave={() => {
							setShowCategories(false);
							setActiveCategory(null);
						}}
					>
						<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
							<div className="flex space-x-16">
								{/* Main Categories */}
								<div className="flex w-48 flex-col space-y-6">
									{categories.map((category) => (
										<button
											key={category.id}
											onMouseEnter={() => setActiveCategory(category)}
											className={`text-left transition-colors ${
												activeCategory?.id === category.id
													? "text-gray-900"
													: "text-gray-600 hover:text-gray-900"
											}`}
										>
											<span className="text-xl tracking-wide">
												{category.title}
											</span>
										</button>
									))}
								</div>

								{/* Subcategories */}
								{activeCategory && (
									<div className="py-2">
										<SubcategoriesGrid
											subcategories={activeCategory.subcategories}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="border-b border-gray-200 bg-white md:hidden">
					<div className="space-y-1 px-4 py-4">
						{categories.map((category) => (
							<div key={category.id} className="py-2">
								<button
									onClick={() =>
										setActiveCategory(
											activeCategory?.id === category.id
												? null
												: category,
										)
									}
									className="text-lg text-gray-900"
								>
									{category.title}
								</button>
								{activeCategory?.id === category.id && (
									<div className="mt-2 space-y-2 pl-4">
										{category.subcategories.map((subcategory) => (
											<a
												key={subcategory}
												href={`/categories/${category.id}/${subcategory.toLowerCase()}`}
												className="block text-sm font-light text-gray-600 hover:text-gray-900"
											>
												{subcategory}
											</a>
										))}
									</div>
								)}
							</div>
						))}
						<a
							href="/setups"
							className="block py-2 text-sm font-light text-gray-600"
						>
							Setups
						</a>
						<a
							href="/community"
							className="block py-2 text-sm font-light text-gray-600"
						>
							Community
						</a>
						<a
							href="/guides"
							className="block py-2 text-sm font-light text-gray-600"
						>
							Guides
						</a>
					</div>
				</div>
			)}
		</Container>
	);
};
