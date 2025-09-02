import { useEffect } from "react";
import {
	useRouter,
	usePathname,
	useSearchParams,
} from "next/navigation";
import { useFilterStore } from "@/stores";
import { CategoryType } from "@/graphql/generated/graphql";
import { SearchParamsKeys } from "../../types";

export const useFilterStoreWithRouter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const updateURL = (
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

		useFilterStore.setState({ updateURL });
	}, [router, pathname, searchParams]);

	useEffect(() => {
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
			minPrice:
				searchParams.get(SearchParamsKeys.MIN_PRICE) || undefined,
			maxPrice:
				searchParams.get(SearchParamsKeys.MAX_PRICE) || undefined,
			sortBy: searchParams.get(SearchParamsKeys.SORT_BY) || undefined,
			page: Number(searchParams.get(SearchParamsKeys.PAGE)) || 1,
		};

		useFilterStore.getState().setFiltersFromURL(filters);
	}, [searchParams]);

	const store = useFilterStore();

	const urlFilters = {
		category: searchParams
			.get(SearchParamsKeys.CATEGORY)
			?.toUpperCase() as CategoryType | undefined,
		subcategory:
			searchParams.get(SearchParamsKeys.SUBCATEGORY) || undefined,
		search: searchParams.get(SearchParamsKeys.SEARCH) || "",
		tags:
			searchParams.get(SearchParamsKeys.TAGS)?.split(",") ||
			undefined,
		minPrice:
			searchParams.get(SearchParamsKeys.MIN_PRICE) || undefined,
		maxPrice:
			searchParams.get(SearchParamsKeys.MAX_PRICE) || undefined,
		sortBy: searchParams.get(SearchParamsKeys.SORT_BY) || undefined,
		page: Number(searchParams.get(SearchParamsKeys.PAGE)) || 1,
	};

	return {
		...store,
		urlFilters,
	};
};
