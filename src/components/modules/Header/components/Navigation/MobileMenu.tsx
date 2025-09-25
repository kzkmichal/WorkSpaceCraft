"use client";

import { useState } from "react";
import {
	Menu,
	ChevronRight,
	ArrowLeft,
	User,
	Settings,
	Plus,
	LogOut,
} from "lucide-react";
import Link from "next/link";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/ui/avatar";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { MobileMenuProps, NavigationMobileStepsType } from "./types";
import { GlobalSearch } from "@/components/modules/Search";

export const MobileMenu = ({
	categories,
	isOpen,
	onClose,
	user,
	onLogout,
	"data-testid": testId = "mobile-menu",
}: MobileMenuProps) => {
	const [mobileStep, setMobileStep] =
		useState<NavigationMobileStepsType>("main");
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleMobileCategoriesClick = () => {
		setMobileStep("categories");
	};

	const handleMobileBackToMain = () => {
		setMobileStep("main");
	};

	const handleLogout = async () => {
		if (!onLogout) return;

		setIsLoggingOut(true);
		try {
			await onLogout();
			onClose();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	const handleLinkClick = () => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 top-[64px] z-[100] bg-background"
			data-testid={testId}
		>
			<div className="h-full overflow-y-auto">
				{mobileStep === "main" && (
					<div className="space-y-6 p-6">
						<div className="space-y-3">
							<h3 className="font-medium text-foreground">Search</h3>
							<div className="relative">
								<GlobalSearch />
							</div>
						</div>
						<div className="space-y-4">
							<button
								onClick={handleMobileCategoriesClick}
								className="flex w-full items-center justify-between rounded-lg bg-muted p-4 text-left transition-colors hover:bg-accent"
							>
								<div className="flex items-center gap-3">
									<Menu className="h-5 w-5 text-muted-foreground" />
									<span className="font-medium text-foreground">
										Categories
									</span>
								</div>
								<ChevronRight className="h-5 w-5 text-muted-foreground" />
							</button>

							<Link
								href="/"
								className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent"
								onClick={handleLinkClick}
							>
								<User className="h-5 w-5 text-muted-foreground" />
								<span className="font-medium text-foreground">
									Home
								</span>
							</Link>
							<Link
								href="/products"
								className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent"
								onClick={handleLinkClick}
							>
								<Settings className="h-5 w-5 text-muted-foreground" />
								<span className="font-medium text-foreground">
									Products
								</span>
							</Link>
						</div>
						<div className="space-y-4 border-t pt-6">
							{user ? (
								<>
									<div className="flex items-center gap-3 p-4">
										<Avatar className="h-10 w-10">
											<AvatarImage
												src={user.image || undefined}
												alt={user.name || "User"}
											/>
											<AvatarFallback>
												<User className="h-5 w-5 text-muted-foreground" />
											</AvatarFallback>
										</Avatar>
										<span className="font-medium text-foreground">
											{user.name || "My Account"}
										</span>
									</div>
									<Link
										href="/profile"
										className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent"
										onClick={handleLinkClick}
									>
										<Settings className="h-5 w-5 text-muted-foreground" />
										<span className="text-foreground">
											Account Settings
										</span>
									</Link>
									<Link
										href="/products/add"
										className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent"
										onClick={handleLinkClick}
									>
										<Plus className="h-5 w-5 text-muted-foreground" />
										<span className="text-foreground">
											Add Product
										</span>
									</Link>
									<button
										onClick={handleLogout}
										disabled={isLoggingOut}
										className="flex w-full items-center gap-3 rounded-lg p-4 text-left text-destructive transition-colors hover:bg-destructive/10"
									>
										<LogOut className="h-5 w-5" />
										<span>
											{isLoggingOut ? "Logging out..." : "Logout"}
										</span>
									</button>
								</>
							) : (
								<Link
									href="/auth/signin"
									className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent"
									onClick={handleLinkClick}
								>
									<User className="h-5 w-5 text-muted-foreground" />
									<span className="text-foreground">Sign In</span>
								</Link>
							)}
						</div>
					</div>
				)}
				{mobileStep === "categories" && (
					<div className="p-6">
						<button
							onClick={handleMobileBackToMain}
							className="-ml-2 mb-6 flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent"
						>
							<ArrowLeft className="h-5 w-5 text-muted-foreground" />
							<span className="font-medium text-foreground">
								Categories
							</span>
						</button>
						{categories.length > 0 && (
							<Accordion
								type="single"
								collapsible
								className="space-y-4"
							>
								{categories.map((category) => {
									const IconComponent = category.icon;
									return (
										<AccordionItem
											key={category.id}
											value={category.id}
											className="overflow-hidden rounded-lg border"
										>
											<AccordionTrigger className="p-4 hover:bg-muted">
												<div className="flex items-center gap-3">
													<IconComponent className="h-5 w-5 text-muted-foreground" />
													<div className="text-left">
														<div className="font-medium text-foreground">
															{category.title}
														</div>
													</div>
												</div>
											</AccordionTrigger>
											<AccordionContent className="bg-muted/50 p-4 pt-0">
												<div className="grid grid-cols-2 gap-2">
													{category.subcategories
														.slice(0, 6)
														.map((subcategory) => (
															<Link
																key={subcategory.id}
																href={subcategory.fullSlug}
																className="inline-flex items-center rounded-full border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
																onClick={handleLinkClick}
															>
																{subcategory.name}
															</Link>
														))}
												</div>
												<Link
													href={category.link}
													className="mt-3 flex w-full items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 p-3 text-left transition-colors hover:bg-primary/20"
													onClick={handleLinkClick}
												>
													<ChevronRight className="h-4 w-4 text-primary" />
													<span className="text-sm font-medium text-primary">
														View all →
													</span>
												</Link>
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
