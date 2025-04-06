"use client";
import { useState } from "react";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { AdminUserListProps } from "./types";
import { updateUserRole } from "@/app/actions/admin";

export const AdminUserList = ({
	users,
	currentPage,
	totalPages,
}: AdminUserListProps) => {
	const [updating, setUpdating] = useState<string | null>(null);

	const handleRoleChange = async (
		userId: string,
		newRole: UserRole,
	) => {
		try {
			setUpdating(userId);
			const result = await updateUserRole(userId, newRole);

			if (!result.success) {
				console.error("Failed to update user role:", result.error);
			}
		} catch (error) {
			console.error("Error updating role:", error);
		} finally {
			setUpdating(null);
		}
	};

	return (
		<div>
			<h1 className="mb-6 text-2xl font-bold">Manage Users</h1>

			<div className="overflow-hidden rounded-lg bg-white shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								User
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Joined
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="o flex items-center gap-4">
										<div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
											{user.image && (
												<Image
													src={user.image}
													alt={user.name || ""}
													layout="fill"
													objectFit="cover"
													objectPosition="center"
													className="h-6 w-6 rounded-md"
												/>
											)}
										</div>
										<div>
											<div className="text-sm font-medium text-gray-900">
												{user.name}
											</div>
										</div>
									</div>
								</td>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="text-sm text-gray-900">
										{user.email}
									</div>
								</td>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="text-sm text-gray-500">
										{new Date(user.createdAt).toDateString()}
									</div>
								</td>
								<td className="whitespace-nowrap px-6 py-4">
									<select
										value={user.role}
										onChange={(e) =>
											handleRoleChange(
												user.id,
												e.target.value as UserRole,
											)
										}
										className="rounded border border-gray-300 p-1 text-sm"
									>
										<option value="USER">User</option>
										<option value="ADMIN">Admin</option>
									</select>
									<p>{updating}</p>
								</td>
								<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
									<button
										className="mr-3 text-blue-600 hover:text-blue-900"
										onClick={() => {
											/* View user profile */
										}}
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination controls */}
			<div className="mt-4 flex justify-between">
				<button
					disabled={currentPage <= 1}
					className="rounded border bg-white px-4 py-2 disabled:opacity-50"
				>
					Previous
				</button>
				<button
					disabled={users.length < 20}
					className="rounded border bg-white px-4 py-2 disabled:opacity-50"
				>
					Next
				</button>

				<p>{totalPages}</p>
			</div>
		</div>
	);
};
