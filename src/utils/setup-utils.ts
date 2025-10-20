import { SetupCategory } from "@/graphql/generated/graphql";

export const parseCategoryFromUrl = (
	category: string,
): SetupCategory | undefined => {
	const mapping: { [key: string]: SetupCategory } = {
		"home-office": "HOME_OFFICE",
		office: "OFFICE",
		"remote-work": "REMOTE_WORK",
	};
	return mapping[category] || undefined;
};
