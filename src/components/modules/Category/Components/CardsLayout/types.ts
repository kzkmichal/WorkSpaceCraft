import { BaseProps } from "@/components/utils/types";

export type CardsLayoutProps = BaseProps & {
	items?: Array<{
		title?: string;
		desc?: string;
	}>;
};
