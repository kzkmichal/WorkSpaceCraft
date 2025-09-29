import { ProductTechnicalFeature } from "@/lib/validations/product";

export type TechnicalFeatureInputProps = {
	technicalFeatures: ProductTechnicalFeature[];
	onChange: (features: ProductTechnicalFeature[]) => void;
	error?: string;
	className?: string;
};
