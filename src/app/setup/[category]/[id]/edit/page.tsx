import { SetupForm } from "@/components/modules/Setups/SetupForm/SetupFrom";
import { SetupProductsSection } from "@/components/modules/Setups/SetupProductSection/SetupProductsSection";
import { getSetup } from "@/hooks/setup";
import { auth } from "@/lib/auth";
import { parseCategoryFromUrl } from "@/utils/setup-utils";
import { notFound, redirect } from "next/navigation";

type SetupProps = {
	params: Promise<{
		id: string;
		category: string;
	}>;
};

export default async function SetupCreatePage({
	params,
}: SetupProps) {
	const session = await auth();

	if (!session?.user || !session.user.id) {
		redirect(
			`/auth/signin?callbackUrl=/setup/${(await params).category}/${(await params).id}/edit`,
		);
	}
	const { id, category } = await params;

	const parsedCategory = parseCategoryFromUrl(category);

	const setup = await getSetup(id);

	if (!category || !parsedCategory || !setup) {
		notFound();
	}

	if (
		setup.userId !== session.user.id &&
		session.user.role !== "ADMIN"
	) {
		redirect("/setups");
	}

	return (
		<div className="container mx-auto max-w-6xl py-8">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
				<div className="lg:col-span-2">
					<SetupForm
						setup={setup}
						category={setup.category}
						isEditing={true}
					/>
				</div>

				<div className="lg:col-span-2">
					<SetupProductsSection
						setupId={setup.id}
						products={setup.products}
						setupStatus={setup.status}
					/>
				</div>
			</div>
		</div>
	);
}
