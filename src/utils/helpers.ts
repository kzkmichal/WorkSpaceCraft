export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const truncateText = (
	text: string,
	maxLength: number,
): string => {
	if (text.length <= maxLength) return text;
	return text.substr(0, maxLength) + "...";
};

export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");
};
