import React from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/components/utils/helpers";
import { KeyValueInputProps, KeyValueItem } from "./types";

export const KeyValueInput: React.FC<KeyValueInputProps> = ({
	label,
	items,
	onChange,
	placeholder = {},
	showUnit = false,
	unitOptions = [],
	nameOptions = [],
	error,
	className,
}) => {
	const addItem = () => {
		const newItem: KeyValueItem = {
			id: Math.random().toString(36).substr(2, 9),
			name: "",
			value: "",
			...(showUnit && { unit: "" }),
		};
		onChange([...items, newItem]);
	};

	const removeItem = (index: number) => {
		onChange(items.filter((_, i) => i !== index));
	};

	const updateItem = (
		index: number,
		field: keyof KeyValueItem,
		value: string,
	) => {
		const updatedItems = items.map((item, i) =>
			i === index ? { ...item, [field]: value } : item,
		);
		onChange(updatedItems);
	};

	return (
		<div className={cn("space-y-3", className)}>
			<div className="flex items-center justify-between">
				<label className="block text-sm font-medium text-foreground">
					{label}
				</label>
				<button
					type="button"
					onClick={addItem}
					className="inline-flex items-center rounded-lg border border-transparent bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
				>
					<Plus className="mr-1 h-4 w-4" />
					Add {label.toLowerCase().slice(0, -1)}
				</button>
			</div>

			{items.length === 0 ? (
				<div className="rounded-lg border-2 border-dashed border-muted py-8 text-center text-sm text-muted-foreground">
					No {label.toLowerCase()} added yet. Click "Add" to get
					started.
				</div>
			) : (
				<div className="space-y-3">
					{items.map((item, index) => (
						<div
							key={item.id || index}
							className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
						>
							<div className="flex-1">
								{nameOptions.length > 0 ? (
									<select
										value={item.name}
										onChange={(e) =>
											updateItem(index, "name", e.target.value)
										}
										className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									>
										<option value="">
											{placeholder.name || "Select name..."}
										</option>
										{nameOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								) : (
									<input
										type="text"
										value={item.name}
										onChange={(e) =>
											updateItem(index, "name", e.target.value)
										}
										placeholder={placeholder.name || "Name"}
										className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								)}
							</div>
							<div className="flex-1">
								<input
									type="text"
									value={item.value}
									onChange={(e) =>
										updateItem(index, "value", e.target.value)
									}
									placeholder={placeholder.value || "Value"}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								/>
							</div>
							{showUnit && (
								<div className="w-24">
									{unitOptions.length > 0 ? (
										<select
											value={item.unit || ""}
											onChange={(e) =>
												updateItem(index, "unit", e.target.value)
											}
											className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">
												{placeholder.unit || "Unit"}
											</option>
											{unitOptions.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
									) : (
										<input
											type="text"
											value={item.unit || ""}
											onChange={(e) =>
												updateItem(index, "unit", e.target.value)
											}
											placeholder={placeholder.unit || "Unit"}
											className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									)}
								</div>
							)}
							<button
								type="button"
								onClick={() => removeItem(index)}
								className="rounded-md p-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
								title="Remove item"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>
			)}

			{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
		</div>
	);
};
