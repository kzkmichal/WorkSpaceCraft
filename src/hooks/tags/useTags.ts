"use client";

import {
	useTagsQuery,
	usePopularTagsQuery,
} from "@/graphql/generated/graphql";

export function useTags() {
	const { data, loading, error } = useTagsQuery({
		fetchPolicy: "network-only",
	});

	return {
		tags: data?.tags || [],
		loading,
		error,
	};
}

export function usePopularTags(limit = 20) {
	const { data, loading, error } = usePopularTagsQuery({
		variables: { limit },
	});

	return {
		popularTags: data?.popularTags || [],
		loading,
		error,
	};
}
