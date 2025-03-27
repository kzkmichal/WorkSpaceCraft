"use client";

import Link from "next/link";
import Image from "next/image";
import { AdminDashboardProps } from "./types";
import { DashboardCard } from "./Components/DashboardCard";

export const AdminDashboard = ({
	recentUsers,
	reportedProducts,
}: AdminDashboardProps) => {
	return (
		<div className="space-y-8">
			<h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<DashboardCard
					title="Reported Products"
					count={reportedProducts.length}
					linkHref="/admin/products?reported=true"
					linkText="View All"
					color="bg-red-50 border-red-200"
					textColor="text-red-700"
				/>
				<DashboardCard
					title="Recent Users"
					count={recentUsers.length}
					linkHref="/admin/users"
					linkText="Manage Users"
					color="bg-blue-50 border-blue-200"
					textColor="text-blue-700"
				/>
				<DashboardCard
					title="Categories"
					linkHref="/admin/categories"
					linkText="Manage Categories"
					color="bg-green-50 border-green-200"
					textColor="text-green-700"
				/>
			</div>
			<div>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-semibold">Reported Products</h2>
					<Link
						href="/admin/products?reported=true"
						className="text-sm text-blue-600 hover:text-blue-800"
					>
						View All Reported Products
					</Link>
				</div>

				{reportedProducts.length === 0 ? (
					<div className="rounded-lg border bg-white p-6 text-center">
						<p className="text-gray-500">
							No reported products at this time.
						</p>
					</div>
				) : (
					<div className="overflow-hidden rounded-lg border bg-white">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Product
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Reported By
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Reports
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{reportedProducts.map((product) => (
									<tr key={product.id} className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												{product.imageUrl && (
													<Image
														src={product.imageUrl}
														alt={product.title}
														className="mr-3 h-10 w-10 rounded-md object-cover"
													/>
												)}
												<div>
													<div className="font-medium text-gray-900">
														{product.title}
													</div>
													<div className="text-sm text-gray-500">
														by {product.createdBy}
													</div>
												</div>
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{/* Would normally show who reported, but we don't track this in our current model */}
											Multiple users
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
												{product.reportCount || 1}
											</span>
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm">
											<div className="flex space-x-2">
												<Link
													href={`/admin/products/${product.id}`}
													className="text-blue-600 hover:text-blue-900"
												>
													Review
												</Link>
												<Link
													href={`/products/${product.id}`}
													className="text-gray-600 hover:text-gray-900"
												>
													View
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-semibold">Recent Users</h2>
					<Link
						href="/admin/users"
						className="text-sm text-blue-600 hover:text-blue-800"
					>
						View All Users
					</Link>
				</div>

				<div className="overflow-hidden rounded-lg border bg-white">
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
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{recentUsers.map((user) => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-6 py-4">
										<div className="flex items-center">
											{user.image && (
												<Image
													src={user.image}
													alt={user.name || ""}
													className="mr-3 h-8 w-8 rounded-full"
													layout="fixed"
													width={32}
													height={32}
												/>
											)}
											<div>
												<div className="font-medium text-gray-900">
													{user.name}
												</div>
											</div>
										</div>
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{user.email}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{new Date(user.createdAt).toDateString()}
									</td>
									<td className="whitespace-nowrap px-6 py-4">
										<span
											className={`rounded-full px-2 py-1 text-xs font-semibold ${
												user.role === "ADMIN"
													? "bg-purple-100 text-purple-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{user.role}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
