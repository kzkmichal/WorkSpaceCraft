import { BaseProps } from "@/components/utils/types";

export type CategoryCardProps = BaseProps & {
	name?: string;
	image?: string;
	slug?: string;
	desc?: string;
	reverse: boolean;
};
