"use client";

import { useState } from "react";
import { User, Settings, Plus, LogOut } from "lucide-react";
import Link from "next/link";

import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { UserMenuProps } from "./types";

export const UserMenu = ({
	user,
	isLoading,
	onLogout,
	"data-testid": testId = "user-menu",
}: UserMenuProps) => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		if (!onLogout) return;

		setIsLoggingOut(true);
		try {
			await onLogout();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	if (isLoading) {
		return (
			<div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="flex items-center gap-2 transition-opacity hover:opacity-80"
				data-testid={`${testId}-trigger`}
			>
				<Avatar className="h-8 w-8">
					<AvatarImage
						src={user?.image || undefined}
						alt={user?.name || "User"}
					/>
					<AvatarFallback>
						<User className="h-4 w-4 text-gray-600" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-48"
				align="end"
				data-testid={`${testId}-content`}
			>
				{user ? (
					<>
						<DropdownMenuItem asChild>
							<Link
								href="/profile"
								className="flex items-center gap-2"
							>
								<Settings className="h-4 w-4" />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link
								href="/products/add"
								className="flex items-center gap-2"
							>
								<Plus className="h-4 w-4" />
								Add Product
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className="flex items-center gap-2 text-red-600"
							disabled={isLoggingOut}
						>
							<LogOut className="h-4 w-4" />
							{isLoggingOut ? "Logging out..." : "Logout"}
						</DropdownMenuItem>
					</>
				) : (
					<DropdownMenuItem asChild>
						<Link
							href="/auth/signin"
							className="flex items-center gap-2"
						>
							<User className="h-4 w-4" />
							Sign In
						</Link>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
