import { categories, UserSetupsProps } from "./types";
import { Link } from "@/components/common/atoms";
import { SetupCard } from "./SetupCard";
import { EmptySetupCard } from "./EmptySetupCard";

export const UserSetups = ({
	setups,
	"data-testid": testId = "user-setups",
}: UserSetupsProps) => {
	const setupsByCategory = categories.map((category) => {
		const setup = setups.find((s) => s.category === category);
		return { category, setup };
	});

	if (setups.length === 0) {
		return (
			<div className="rounded-lg border bg-gray-50 py-10 text-center">
				<p className="mb-4 text-gray-500">
					You haven&apos;t added any setups yet.
				</p>
				<Link
					href="/setups/add"
					className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Add Your First Setup
				</Link>
			</div>
		);
	}

	return (
		<div
			className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
			data-testid={testId}
		>
			{setupsByCategory.map(({ category, setup }) => (
				<div key={category}>
					{setup ? (
						<SetupCard {...setup} isOwner={true} />
					) : (
						<EmptySetupCard category={category} />
					)}
				</div>
			))}
		</div>
	);
};
