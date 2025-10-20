import { BaseProps } from "@/components/utils/types";
import {
	SetupCategory,
	SetupFieldsFragment,
} from "@/graphql/generated/graphql";

export type UserSetupsProps = BaseProps & {
	setups: Omit<
		SetupFieldsFragment & { productCount: number },
		"user" | "createdAt" | "updatedAt"
	>[];
};

export type SetupCardProps = BaseProps &
	Omit<SetupFieldsFragment, "user" | "createdAt" | "updatedAt"> & {
		isOwner?: boolean;
		productCount?: number;
	};
export type SetupCardActionButtonsProps = BaseProps & {
	id: string;
	title: string;
	isDraft?: boolean;
	category: SetupCategory;
	productsCount?: number;
};

export type EmptySetupCardProps = BaseProps & {
	category: SetupCategory;
};

export type DeleteSetupDialogProps = BaseProps & {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	setupId: string;
	setupTitle: string;
	onSuccess: () => void;
};

export const SetupCategories = {
	HOME_OFFICE: " Home Office",
	OFFICE: "Office",
	REMOTE_WORK: "Remote Work",
};

export const categories: SetupCategory[] = [
	"HOME_OFFICE",
	"OFFICE",
	"REMOTE_WORK",
];
