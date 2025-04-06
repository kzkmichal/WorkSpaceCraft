"use client";

import { FormEvent, useState } from "react";
import { ProductReportButtonProps } from "./types";
import { reportProduct } from "@/app/actions/product";

export const ProductReportButton = ({
	productId,
}: ProductReportButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const result = await reportProduct(productId, reason);

			if (result.success) {
				setIsOpen(false);
				setReason("");
			}
		} catch (error) {
			console.error("Error reporting product:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="text-sm text-red-600 hover:text-red-800"
			>
				Report
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-md rounded-lg bg-white p-6">
						<h2 className="mb-4 text-xl font-bold">Report Product</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="mb-1 block text-sm font-medium">
									Reason for reporting
								</label>
								<textarea
									value={reason}
									onChange={(e) => setReason(e.target.value)}
									className="w-full rounded border p-2"
									rows={4}
									required
								/>
							</div>
							<div className="flex justify-end space-x-2">
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="rounded border px-4 py-2 text-gray-700"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="rounded bg-red-600 px-4 py-2 text-white"
								>
									{loading ? "Submitting..." : "Submit Report"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
