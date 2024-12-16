"use client";

export type InputProps = {
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
	type,
	placeholder,
	value,
	onChange,
}: InputProps) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-full rounded border px-3 py-2"
		/>
	);
};
