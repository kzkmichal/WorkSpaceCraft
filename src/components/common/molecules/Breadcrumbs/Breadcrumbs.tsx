"use client";

import React, { useMemo } from "react";
import {
	BreadcrumbsProps,
	BreadcrumbItem as BreadcrumbItemType,
} from "./types";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { breadcrumbsRoutes, hiddenPaths, routeLabels } from "./const";
import { Container } from "../Container";

export const AppBreadcrumbs = ({
	className,
	hideOnPaths = [hiddenPaths.ROOT],
}: BreadcrumbsProps) => {
	const pathname = usePathname();

	const breadcrumbs = useMemo(() => {
		const segments = pathname.split("/").filter(Boolean);

		if (segments.length === 0) return [];

		const items: BreadcrumbItemType[] = [
			{ label: "Home", href: "/" },
		];

		let currentPath = "";
		segments.forEach((segment, index) => {
			let correctedPath = currentPath;
			if (segment === breadcrumbsRoutes.SETUP && index === 0) {
				correctedPath += "/setups";
			} else {
				correctedPath += `/${segment}`;
			}
			currentPath = correctedPath;

			const isLast = index === segments.length - 1;

			const shouldSkipSegment =
				isLast &&
				((segments[0] === breadcrumbsRoutes.PRODUCTS &&
					segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.SETUPS &&
						segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.ARTICLES &&
						segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.SETUP &&
						segments.length === 3) ||
					(segments[0] === breadcrumbsRoutes.SETUP &&
						segments[1] === breadcrumbsRoutes.HOME &&
						segments.length === 3) ||
					(segments[0] === breadcrumbsRoutes.SETUP &&
						segments[1] === breadcrumbsRoutes.REMOTE &&
						segments.length === 3) ||
					(isLast &&
						segment.length > 20 &&
						/^[a-z0-9]+$/i.test(segment)));

			if (shouldSkipSegment) {
				return;
			}

			const willSkipNext =
				!isLast &&
				((segments[0] === breadcrumbsRoutes.PRODUCTS &&
					index === 0 &&
					segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.SETUPS &&
						index === 0 &&
						segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.ARTICLES &&
						index === 0 &&
						segments.length === 2) ||
					(segments[0] === breadcrumbsRoutes.SETUP &&
						index === 1 &&
						segments.length === 3) ||
					(!isLast &&
						index === segments.length - 2 &&
						segments[segments.length - 1].length > 20));

			const isActive = isLast || willSkipNext;

			const label =
				routeLabels[segment] ||
				segment.charAt(0).toUpperCase() + segment.slice(1);

			items.push({
				label,
				href: currentPath,
				isActive,
			});
		});

		return items;
	}, [pathname]);

	if (hideOnPaths.includes(pathname) || breadcrumbs.length <= 1) {
		return null;
	}

	return (
		<Container className="w-full border-b bg-muted/40">
			<Breadcrumb className={className}>
				<BreadcrumbList>
					{breadcrumbs.map((item, index) => (
						<React.Fragment key={item.href}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link
										href={item.href}
										className={`max-w-[200px] truncate ${
											item.isActive
												? "font-medium text-foreground"
												: ""
										}`}
									>
										{index === 0 ? (
											<div className="flex items-center gap-1.5">
												<Home className="h-3.5 w-3.5" />
												{item.label}
											</div>
										) : (
											item.label
										)}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index < breadcrumbs.length - 1 && (
								<BreadcrumbSeparator />
							)}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</Container>
	);
};
