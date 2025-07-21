import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTag } from "@/hooks/getTag";
import { TagProductsView } from "@/components/modules/Tag/TagProductsView";

type TagPageProps = {
	params: Promise<{
		tagSlug: string;
	}>;
};

export async function generateMetadata(
	props: TagPageProps,
): Promise<Metadata> {
	const params = await props.params;
	const tag = await getTag(params.tagSlug);

	if (!tag) {
		return {
			title: "Tag Not Found",
		};
	}

	return {
		title: `Products tagged with "${tag.name}"`,
		description: `Browse products tagged with "${tag.name}" on WorkSpaceCraft.`,
		openGraph: {
			title: `Products tagged with "${tag.name}" | WorkSpaceCraft`,
			description: `Browse products tagged with "${tag.name}" on WorkSpaceCraft.`,
		},
	};
}

export default async function TagPage(props: TagPageProps) {
	const params = await props.params;
	const tag = await getTag(params.tagSlug);

	if (!tag) {
		notFound();
	}

	return <TagProductsView tag={tag} />;
}
