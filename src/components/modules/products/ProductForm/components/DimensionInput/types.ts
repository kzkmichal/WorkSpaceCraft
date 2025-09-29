import { ProductDimension } from "@/lib/validations/product";

export type DimensionInputProps = {
	dimensions: ProductDimension[];
	onChange: (dimensions: ProductDimension[]) => void;
	error?: string;
	className?: string;
};
