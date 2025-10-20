import { BaseProps } from "@/components/utils/types";
import { SetupProductItemFieldsFragment } from "@/graphql/generated/graphql";
import { SetupStatus } from "@prisma/client";

export type SetupProductsSectionProps = BaseProps & {
	setupId: string;
	products: SetupProductItemFieldsFragment[];
	setupStatus: SetupStatus;
};

export type SetupProductItemProps = BaseProps & {
	setupProduct: SetupProductItemFieldsFragment;
	setupId: string;
	index: number;
};
