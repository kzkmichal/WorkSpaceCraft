import { BaseProps } from "@/components/utils/types";
import {
	SetupCategory,
	SetupFieldsFragment,
} from "@/graphql/generated/graphql";

export type SetupCardProps = BaseProps &
	Omit<SetupFieldsFragment, "createdAt" | "updatedAt"> & {
		isOwner: boolean;
	};
