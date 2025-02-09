import { Category } from "@/components/modules";

const data = {
	title: "Category",
	desc: "Explore our category and find the right one for you.",
	subcategories: [
		{
			title: "Pay supplier invoices",
			desc: "Our goal is to streamline SMB trade, making it easier and faster than ever.",
		},
		{
			title: "Pay supplier invoices",
			desc: "Our goal is to streamline SMB trade, making it easier and faster than ever.",
		},
		{
			title: "Pay supplier invoices",
			desc: "Our goal is to streamline SMB trade, making it easier and faster than ever.",
		},
		{
			title: "Pay supplier invoices",
			desc: "Our goal is to streamline SMB trade, making it easier and faster than ever.",
		},
	],
};

export default function CategoryPage() {
	return <Category {...data} />;
}
