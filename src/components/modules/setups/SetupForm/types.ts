import { BaseProps } from "@/components/utils/types";
import {
	SetupCategory,
	SetupFieldsFragment,
} from "@/graphql/generated/graphql";

export type SetupFormProps = BaseProps & {
	category: SetupCategory;
	setup?: Omit<SetupFieldsFragment, "createdAt" | "updatedAt">;
	isEditing: boolean;
};
