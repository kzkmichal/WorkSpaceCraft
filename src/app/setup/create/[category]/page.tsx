import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { SetupForm } from "@/components/modules/Setups/SetupForm/SetupFrom";
import { parseCategoryFromUrl } from "@/utils/setup-utils";

type SetupProps = {
	params: Promise<{
		category: string;
	}>;
};

export async function generateMetadata({ params }: SetupProps) {
	const { category } = await params;

	const parsedCategory = parseCategoryFromUrl(category);

	if (!parsedCategory) {
		return {
			title: "Create Setup",
			description: "Create a new workspace setup",
		};
	}

	const categoryLabel = category
		.split("_")
		.map(
			(word: string) => word.charAt(0) + word.slice(1).toLowerCase(),
		)
		.join(" ");

	return {
		title: `Create ${categoryLabel} Setup`,
		description: `Create your ${categoryLabel.toLowerCase()} workspace setup`,
		openGraph: {
			title: `Create ${categoryLabel} Setup | WorkSpaceCraft`,
			description: `Showcase your ${categoryLabel.toLowerCase()} workspace`,
		},
	};
}

export default async function CreateSetupPage(props: SetupProps) {
	const session = await auth();

	const { category } = await props.params;

	const parsedCategory = parseCategoryFromUrl(category);

	if (!category || !parsedCategory) {
		notFound();
	}

	if (!session?.user || !session.user.id) {
		redirect("/auth/signin?callbackUrl=/setups/create");
	}

	return (
		<div>
			<SetupForm category={parsedCategory} isEditing={false} />
		</div>
	);
}
