import { BaseProps } from "@/components/utils/types";
import { ProductImage } from "@/lib/validations/product";

export type ImageUploadProps = BaseProps & {
	images: ProductImage[];
	onChange: (images: ProductImage[]) => void;
	maxImages?: number;
};
