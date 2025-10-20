import { SetupsGallery } from "@/components/modules/Setups/SetupsGallery";
import { getCategoryLabel } from "@/components/modules/User/Components/UserSetups/utils";
import { getSetupsByCategory } from "@/hooks/setup";
import { parseCategoryFromUrl } from "@/utils/setup-utils";

type PageProps = {
	searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps) {
	const { category } = await searchParams;
	const parsedCategory = category
		? parseCategoryFromUrl(category)
		: undefined;

	return {
		title: parsedCategory
			? `${getCategoryLabel(parsedCategory)} Setups`
			: "Workspace Setups Gallery",
		description: "Discover workspace setups from our community",
	};
}

export default async function SetupsPage({
	searchParams,
}: PageProps) {
	const { category, page } = await searchParams;

	const parsedCategory = category
		? parseCategoryFromUrl(category)
		: undefined;
	const parsedPage = page ? parseInt(page) : 1;

	const setupsData = await getSetupsByCategory(
		parsedCategory,
		"PUBLISHED",
		parsedPage,
		20,
	);

	const setups = setupsData.map((setup) => ({
		...setup,
		productCount: 0,
	}));

	return (
		<SetupsGallery
			setups={setups}
			activeCategory={parsedCategory}
			currentPage={parsedPage}
		/>
	);
}
