import { SetupCategory } from "@prisma/client";

export const getCategoryIcon = (category: SetupCategory): string => {
	const icons: Record<SetupCategory, string> = {
		HOME_OFFICE: "🏠",
		OFFICE: "🏢",
		REMOTE_WORK: "✈️",
	};
	return icons[category];
};

export const getCategoryLabel = (category: SetupCategory): string => {
	const labels: Record<SetupCategory, string> = {
		HOME_OFFICE: "Home Office",
		OFFICE: "Office",
		REMOTE_WORK: "Remote Work",
	};
	return labels[category];
};

export const getCategoryColor = (category: SetupCategory): string => {
	const colors: Record<SetupCategory, string> = {
		HOME_OFFICE: "blue",
		OFFICE: "purple",
		REMOTE_WORK: "green",
	};
	return colors[category];
};
