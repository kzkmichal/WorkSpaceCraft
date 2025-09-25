import { Hero } from "@/components/modules/Hero/Hero";
import { getCategories } from "@/hooks/getCategories";
import { CategoryType } from "@prisma/client";

export default async function HomePage() {
	const categories = await getCategories();

	const staticSubcategories = {
		[CategoryType.HOME]:
			categories
				.find((cat) => cat.type === CategoryType.HOME)
				?.subcategories?.slice(0, 6)
				.map((sub) => ({
					name: sub?.name || "",
					description: sub?.description || "",
					link: sub?.fullSlug || "",
				})) || [],
		[CategoryType.REMOTE]:
			categories
				.find((cat) => cat.type === CategoryType.REMOTE)
				?.subcategories?.slice(0, 6)
				.map((sub) => ({
					name: sub?.name || "",
					description: sub?.description || "",
					link: sub?.fullSlug || "",
				})) || [],
		[CategoryType.OFFICE]:
			categories
				.find((cat) => cat.type === CategoryType.OFFICE)
				?.subcategories?.slice(0, 6)
				.map((sub) => ({
					name: sub?.name || "",
					description: sub?.description || "",
					link: sub?.fullSlug || "",
				})) || [],
	};

	return <Hero staticSubcategories={staticSubcategories} />;
}
