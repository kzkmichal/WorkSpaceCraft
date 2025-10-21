import { SetupView } from "@/components/modules/Setups/SetupView";
import { getSetup } from "@/hooks/setup";
import { parseCategoryFromUrl } from "@/utils/setup-utils";
import { notFound } from "next/dist/client/components/navigation";
import { getOptionalAuth } from "@/lib/session-helpers";

type PageProps = {
	params: Promise<{
		category: string;
		id: string;
	}>;
};

export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;
	const setup = await getSetup(id);

	if (!setup) return {};

	return {
		title: setup.title,
		description: setup.description || undefined,
		openGraph: {
			title: setup.title,
			description: setup.description || undefined,
			images: setup.imageUrl ? [setup.imageUrl] : [],
		},
	};
}

export default async function SetupDetailPage(props: PageProps) {
	const { category, id } = await props.params;

	const parsedCategory = parseCategoryFromUrl(category);

	if (!category || !parsedCategory) {
		notFound();
	}

	const setup = await getSetup(id);

	if (!setup) notFound();

	const session = await getOptionalAuth();
	const isOwner = session?.user?.id === setup.userId;

	return <SetupView {...setup} isOwner={isOwner} />;
}
