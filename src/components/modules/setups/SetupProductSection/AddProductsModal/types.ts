import { BaseProps } from "@/components/utils/types";

export type AddProductsModalProps = BaseProps & {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	setupId: string;
	currentProductIds: string[];
};
