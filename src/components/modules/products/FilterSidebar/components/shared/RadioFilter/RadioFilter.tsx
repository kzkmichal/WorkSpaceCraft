"use client";

import { RadioFilterProps } from "./types";
import { cn } from "@/components/utils/helpers";

export const RadioFilter = ({
	name,
	options,
	value,
	onChange,
	defaultLabel = "All",
	defaultValue,
	"data-testid": testId = "radio-filter",
	className = "",
}: RadioFilterProps) => {
	const labelCx = (selected: boolean) =>
		cn(
			"group relative flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all duration-200",
			"hover:bg-muted/60",
			"focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0",
			selected &&
				"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary",
		);

	return (
		<div
			className={`flex flex-col gap-2 ${className}`}
			data-testid={testId}
		>
			<label className={labelCx(value === defaultValue)}>
				<input
					type="radio"
					name={name}
					checked={value === defaultValue}
					onChange={() => onChange(defaultValue)}
					className="sr-only"
				/>
				<span
					className={cn(
						"text-sm font-semibold transition-colors duration-200",
						value === defaultValue
							? "text-primary"
							: "text-foreground",
					)}
				>
					{defaultLabel}
				</span>
			</label>
			{options.map((option) => (
				<label
					key={option.value || "default"}
					className={labelCx(value === option.value)}
				>
					<input
						type="radio"
						name={name}
						checked={value === option.value}
						onChange={() => onChange(option.value)}
						className="sr-only"
					/>
					<span
						className={cn(
							"text-sm font-semibold transition-colors duration-200",
							value === option.value
								? "text-primary"
								: "text-foreground",
						)}
					>
						{option.label}
					</span>
					{(option.count !== undefined || option.badge) && (
						<span
							className={cn(
								"text-sm font-semibold",
								option.count === 0
									? "text-muted-foreground"
									: "text-foreground",
								value === option.value && "text-primary",
							)}
						>
							{option.count}
						</span>
					)}
				</label>
			))}
		</div>
	);
};
