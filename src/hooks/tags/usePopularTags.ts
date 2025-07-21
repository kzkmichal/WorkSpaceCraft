"use client";

import { usePopularTagsQuery } from "@/graphql/generated/graphql";

export function usePopularTags(limit = 20) {
	const { data, loading, error } = usePopularTagsQuery({
		variables: { limit },
		fetchPolicy: "cache-first",
		errorPolicy: "all",
	});

	return {
		popularTags: data?.popularTags || [],
		loading,
		error,
	};
}
