import {
	useSearchParams,
	useRouter,
	usePathname,
} from "next/navigation";
import { CategoryType } from "@/graphql/generated/graphql";
import { SearchParamsKeys } from "@/components/modules/Products/types";

export const useFilterParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const filters = {
		category: searchParams
			.get(SearchParamsKeys.CATEGORY)
			?.toUpperCase() as CategoryType | undefined,
		subcategory:
			searchParams.get(SearchParamsKeys.SUBCATEGORY) || undefined,
		search: searchParams.get(SearchParamsKeys.SEARCH) || "",
		tags:
			searchParams.get(SearchParamsKeys.TAGS)?.split(",") ||
			undefined,
		minPrice: searchParams.get(SearchParamsKeys.MIN_PRICE),
		maxPrice: searchParams.get(SearchParamsKeys.MAX_PRICE),
		sortBy: searchParams.get(SearchParamsKeys.SORT_BY),
		page: Number(searchParams.get(SearchParamsKeys.PAGE)) || 1,
	};

	const updateFilter = (
		updates: Record<string, string | undefined>,
	) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value === null || value === undefined || value === "") {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});

		if (!updates.page) {
			params.delete(SearchParamsKeys.PAGE);
		}

		const newUrl = params.toString()
			? `${pathname}?${params}`
			: pathname;
		router.replace(newUrl, { scroll: false });
	};

	return {
		filters,
		updateFilter,
		searchParams,
		pathname,
		router,
	};
};
