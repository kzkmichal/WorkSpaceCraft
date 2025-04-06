type FormErrorProps = {
	message?: string | null;
};

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div
			className="rounded-md bg-red-50 p-4 text-sm text-red-600"
			role="alert"
		>
			{message}
		</div>
	);
};
