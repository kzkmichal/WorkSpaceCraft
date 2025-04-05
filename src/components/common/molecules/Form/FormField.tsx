import React, { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { cn } from "@/components/utils/helpers";

type HookFormFieldProps<TFieldValues extends FieldValues> = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"name"
> & {
	name: Path<TFieldValues>;
	label: string;
	type?: string;
};

export function HookFormField<TFieldValues extends FieldValues>({
	name,
	label,
	type = "text",
	...props
}: HookFormFieldProps<TFieldValues>) {
	const {
		register,
		formState: { errors },
	} = useFormContext<TFieldValues>();

	const errorMessage = errors[name]?.message as string | undefined;

	return (
		<div className="space-y-2">
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<input
				id={name}
				type={type}
				className={cn(
					"mt-1 block w-full rounded-md border p-2 shadow-sm",
					errorMessage ? "border-red-500" : "border-gray-300",
				)}
				{...register(name, {
					valueAsNumber: type === "number",
				})}
				{...props}
			/>
			{errorMessage && (
				<p className="mt-1 text-sm text-red-600">{errorMessage}</p>
			)}
		</div>
	);
}
