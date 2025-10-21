import { SetupForm } from "@/components/modules/Setups/SetupForm/SetupFrom";
import { SetupProductsSection } from "@/components/modules/Setups/SetupProductSection/SetupProductsSection";
import { getSetup } from "@/hooks/setup";
import { checkResourceOwnership } from "@/lib/session-helpers";
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
	const { id, category } = await params;
	const parsedCategory = parseCategoryFromUrl(category);
	const setup = await getSetup(id);

	if (!category || !parsedCategory || !setup) {
		notFound();
	}

	const { canEdit } = await checkResourceOwnership(setup.userId);

	if (!canEdit) {
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
