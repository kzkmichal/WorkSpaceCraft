import { Metadata } from "next";
import { getTags } from "@/hooks/tags/getTags";
import { TagsListView } from "@/components/modules/Tag/TagListView";

export const metadata: Metadata = {
	title: "All Tags - WorkSpaceCraft",
	description: "Browse all product tags on WorkSpaceCraft.",
	openGraph: {
		title: "All Tags | WorkSpaceCraft",
		description: "Browse all product tags on WorkSpaceCraft.",
	},
};

export default async function TagsPage() {
	const tags = await getTags();

	return <TagsListView tags={tags} />;
}
