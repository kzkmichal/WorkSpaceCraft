import { ProductProCon } from "@/lib/validations/product";

export type ProsConsInputProps = {
	pros: ProductProCon[];
	cons: ProductProCon[];
	onProsChange: (pros: ProductProCon[]) => void;
	onConsChange: (cons: ProductProCon[]) => void;
	error?: string;
	className?: string;
};

export type ListSectionProps = {
	title: string;
	items: ProductProCon[];
	onChange: (items: ProductProCon[]) => void;
	placeholder: string;
	icon: React.ReactNode;
	colorClass: string;
	bgClass: string;
};
