"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { logout } from "@/app/actions/auth";
import { GlobalSearch } from "@/components/modules/Search";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { NavigationProps, NavigationCategory } from "./types";
import {
	getCategoryIcon,
	CATEGORY_DESCRIPTIONS,
} from "./categoryIcons";

export const Navigation = ({
	categories = [],
	currentView,
	"data-testid": testId = "navigation",
}: NavigationProps) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isLoading = status === "loading";

	const navigationCategories: NavigationCategory[] = categories.map(
		(category) => ({
			id: category.slug,
			title: category.name,
			description: CATEGORY_DESCRIPTIONS[category.type],
			icon: getCategoryIcon(category.type),
			categoryType: category.type,
			link: `/${category.slug}`,
			subcategories:
				category.subcategories?.map((sub) => ({
					id: sub?.id,
					name: sub?.name,
					slug: sub?.slug,
					fullSlug: `/${sub?.fullSlug}`,
				})) || [],
		}),
	);

	const handleMobileMenuToggle = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleLogout = async () => {
		try {
			await logout();
			router.refresh();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<>
			<div
				className="flex items-center justify-between"
				data-testid={testId}
			>
				<div className="flex items-center gap-8">
					<Link
						href="/"
						prefetch={true}
						className="text-xl font-bold text-foreground transition-colors hover:text-muted-foreground"
					>
						WorkspaceCraft
					</Link>
					<NavigationMenu
						className="hidden lg:flex"
						delayDuration={0}
						skipDelayDuration={0}
					>
						<NavigationMenuList>
							{navigationCategories.length > 0 && (
								<NavigationMenuItem>
									<NavigationMenuTrigger
										triggerMode="click"
										className={`h-10 bg-transparent px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent ${
											currentView === "categories"
												? "text-primary"
												: "text-muted-foreground hover:text-primary focus:text-primary focus:outline-none"
										}`}
									>
										Categories
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="fixed left-0 z-50 w-screen border-b bg-background p-6 shadow-lg">
											<div className="mx-auto max-w-[96rem]">
												<div className="grid grid-cols-3 gap-6">
													{navigationCategories.map((category) => {
														const IconComponent = category.icon;
														return (
															<div
																key={category.id}
																className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
															>
																<div className="space-y-2">
																	<div className="flex items-center gap-2">
																		<IconComponent className="h-5 w-5 text-primary" />
																		<h3 className="text-lg font-semibold text-foreground">
																			{category.title}
																		</h3>
																	</div>
																	<p className="line-clamp-2 text-sm text-muted-foreground">
																		{category.description}
																	</p>
																</div>
																<div className="grid grid-cols-2 gap-2">
																	{category.subcategories
																		.slice(0, 6)
																		.map((subcategory) => (
																			<NavigationMenuLink
																				key={subcategory.id}
																				asChild
																			>
																				<Link
																					href={subcategory.fullSlug}
																					className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
																				>
																					{subcategory.name}
																				</Link>
																			</NavigationMenuLink>
																		))}
																</div>
																<NavigationMenuLink asChild>
																	<Link
																		href={category.link}
																		className="mt-auto inline-flex items-center text-sm font-medium text-primary transition-all duration-200 hover:text-primary/80 hover:underline focus:text-primary/80 focus:underline focus:outline-none"
																	>
																		View all →
																	</Link>
																</NavigationMenuLink>
															</div>
														);
													})}
												</div>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							)}
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/products"
										prefetch={true}
										className={`inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-200 ${
											currentView === "products"
												? "text-primary"
												: "text-muted-foreground hover:text-primary focus:text-primary"
										}`}
									>
										Products
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<div className="hidden lg:block">
						<GlobalSearch className="w-[25rem]" />
					</div>
				</div>
				<div className="flex items-center gap-4">
					<button
						onClick={handleMobileMenuToggle}
						className="rounded-lg p-2 transition-colors hover:bg-accent lg:hidden"
					>
						{isMobileMenuOpen ? (
							<X className="h-5 w-5 text-muted-foreground" />
						) : (
							<Menu className="h-5 w-5 text-muted-foreground" />
						)}
					</button>
					<div className="hidden lg:block">
						<UserMenu
							user={session?.user}
							isLoading={isLoading}
							onLogout={handleLogout}
						/>
					</div>
				</div>
			</div>
			<MobileMenu
				categories={navigationCategories}
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				user={session?.user}
				onLogout={handleLogout}
			/>
		</>
	);
};
