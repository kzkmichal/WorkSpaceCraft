import { Hero } from "@/components/modules/Hero/Hero";
import { getCategory } from "@/hooks/getCategory";
import { CategoryType } from "@prisma/client";

export default async function HomePage() {
	const [homeCategory, remoteCategory, officeCategory] =
		await Promise.all([
			getCategory("home"),
			getCategory("remote"),
			getCategory("office"),
		]);

	const staticSubcategories = {
		[CategoryType.HOME]:
			homeCategory?.subcategories?.slice(0, 6).map((sub) => ({
				name: sub?.name || "",
				description: sub?.description || "",
				link: sub?.fullSlug || "",
			})) || [],
		[CategoryType.REMOTE]:
			remoteCategory?.subcategories?.slice(0, 6).map((sub) => ({
				name: sub?.name || "",
				description: sub?.description || "",
				link: sub?.fullSlug || "",
			})) || [],
		[CategoryType.OFFICE]:
			officeCategory?.subcategories?.slice(0, 6).map((sub) => ({
				name: sub?.name || "",
				description: sub?.description || "",
				link: sub?.fullSlug || "",
			})) || [],
	};

	return <Hero staticSubcategories={staticSubcategories} />;
}
