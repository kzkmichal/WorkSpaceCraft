import React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { cn } from "@/components/utils/helpers";

type CheckboxOption = {
	value: string;
	label: string;
};

type HookFormCheckboxGroupProps<TFieldValues extends FieldValues> = {
	name: Path<TFieldValues>;
	label: string;
	options: CheckboxOption[];
	className?: string;
};

export function HookFormCheckboxGroup<
	TFieldValues extends FieldValues,
>({
	name,
	label,
	options,
	className,
}: HookFormCheckboxGroupProps<TFieldValues>) {
	const {
		register,
		formState: { errors },
	} = useFormContext<TFieldValues>();
	const errorMessage = errors[name]?.message as string | undefined;

	return (
		<div className="space-y-2">
			<label className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className={cn("space-y-2", className)}>
				{options.map((option) => (
					<label key={option.value} className="flex items-center">
						<input
							type="checkbox"
							value={option.value}
							className="h-4 w-4 rounded border-gray-300 text-blue-600"
							{...register(name)}
						/>
						<span className="ml-2">{option.label}</span>
					</label>
				))}
			</div>
			{errorMessage && (
				<p className="mt-1 text-sm text-red-600">{errorMessage}</p>
			)}
		</div>
	);
}
