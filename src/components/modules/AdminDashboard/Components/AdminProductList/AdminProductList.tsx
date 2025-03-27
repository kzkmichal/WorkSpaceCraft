import Image from "next/image";
import { AdminProductListProps } from "./types";

export const AdminProductList = ({
	products,
	currentPage,
	totalPages,
	isReportedView,
}: AdminProductListProps) => {
	return (
		<div>
			<h1 className="mb-6 text-2xl font-bold">
				{isReportedView ? "Reported Products" : "Manage Products"}
			</h1>

			<div className="overflow-hidden rounded-lg bg-white shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Product
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Price
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Created By
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Reported
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{products.map((product) => (
							<tr key={product.id}>
								<td className="whitespace-nowrap px-6 py-4">
									<div className="flex items-center">
										<div className="h-8 w-8 rounded-full bg-muted">
											{product.imageUrl && (
												<Image
													src={product.imageUrl}
													alt={product.title}
													className="h-8 w-8 rounded-full object-cover"
													width={32}
													height={32}
												/>
											)}
										</div>
										<div className="ml-4">
											<div className="text-sm font-medium text-gray-900">
												{product.title}
											</div>
											<div className="text-sm text-gray-500">
												{new Date(product.createdAt).toDateString()}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-900">
										${product.price}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-900">
										{product.createdBy}
									</div>
								</td>
								<td className="px-6 py-4">
									{product.isReported ? (
										<div className="text-sm text-red-500">
											Reported
										</div>
									) : (
										<div className="text-sm text-green-500">
											Not Reported
										</div>
									)}
								</td>
								<td className="px-6 py-4">
									<button className="text-sm text-red-500">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Pagination controls */}
			<div className="mt-6 flex justify-end">
				<button
					disabled={currentPage === 1}
					className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</button>
				<button className="ml-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
					Next
				</button>

				<div className="ml-4 text-sm text-gray-700">
					Page {currentPage} of {totalPages}
				</div>
			</div>
		</div>
	);
};
