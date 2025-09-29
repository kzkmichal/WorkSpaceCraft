import React from "react";
import { Plus, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/components/utils/helpers";
import { ProductProCon } from "@/lib/validations/product";
import { ListSectionProps, ProsConsInputProps } from "./types";

const ListSection: React.FC<ListSectionProps> = ({
	title,
	items,
	onChange,
	placeholder,
	icon,
	colorClass,
	bgClass,
}) => {
	const addItem = () => {
		const newItem: ProductProCon = {
			id: Math.random().toString(36).substr(2, 9),
			text: "",
		};
		onChange([...items, newItem]);
	};

	const removeItem = (index: number) => {
		onChange(items.filter((_, i) => i !== index));
	};

	const updateItem = (index: number, text: string) => {
		const updatedItems = items.map((item, i) =>
			i === index ? { ...item, text } : item,
		);
		onChange(updatedItems);
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className={cn("rounded-full p-1.5", bgClass)}>
						{icon}
					</div>
					<h4 className="text-sm font-medium text-foreground">
						{title}
					</h4>
				</div>
				<button
					type="button"
					onClick={addItem}
					className={cn(
						"inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
						colorClass,
					)}
				>
					<Plus className="mr-1 h-4 w-4" />
					Add
				</button>
			</div>

			{items.length === 0 ? (
				<div className="rounded-lg border-2 border-dashed border-muted py-6 text-center text-sm text-muted-foreground">
					No {title.toLowerCase()} added yet
				</div>
			) : (
				<div className="space-y-2">
					{items.map((item, index) => (
						<div
							key={item.id || index}
							className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3"
						>
							<div className="flex-1">
								<textarea
									value={item.text}
									onChange={(e) => updateItem(index, e.target.value)}
									placeholder={placeholder}
									rows={2}
									className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								/>
							</div>
							<button
								type="button"
								onClick={() => removeItem(index)}
								className="mt-1 rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
								title="Remove"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const ProsConsInput: React.FC<ProsConsInputProps> = ({
	pros,
	cons,
	onProsChange,
	onConsChange,
	error,
	className,
}) => {
	return (
		<div className={cn("space-y-6", className)}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ListSection
					title="Pros"
					items={pros}
					onChange={onProsChange}
					placeholder="What do you like about this product?"
					icon={<ThumbsUp className="h-4 w-4 text-green-600" />}
					colorClass="text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
					bgClass="bg-green-50"
				/>
				<ListSection
					title="Cons"
					items={cons}
					onChange={onConsChange}
					placeholder="What could be improved?"
					icon={<ThumbsDown className="h-4 w-4 text-red-600" />}
					colorClass="text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
					bgClass="bg-red-50"
				/>
			</div>
			{error && (
				<p className="mt-1 text-sm text-destructive">{error}</p>
			)}
		</div>
	);
};
