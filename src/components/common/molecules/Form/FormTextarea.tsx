import React, { TextareaHTMLAttributes } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { cn } from "@/components/utils/helpers";

type HookFormTextareaProps<TFieldValues extends FieldValues> = Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	"name"
> & {
	name: Path<TFieldValues>;
	label: string;
};

export function HookFormTextarea<TFieldValues extends FieldValues>({
	name,
	label,
	rows = 4,
	...props
}: HookFormTextareaProps<TFieldValues>) {
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
			<textarea
				id={name}
				rows={rows}
				className={cn(
					"mt-1 block w-full rounded-md border p-2 shadow-sm",
					errorMessage ? "border-red-500" : "border-gray-300",
				)}
				{...register(name)}
				{...props}
			/>
			{errorMessage && (
				<p className="mt-1 text-sm text-red-600">{errorMessage}</p>
			)}
		</div>
	);
}
