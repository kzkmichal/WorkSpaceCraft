import { CategoryProps } from "./types";
import { CardsLayout } from "./Components/CardsLayout";
import { Container } from "@/components/common/molecules";
import { SubcategoryFieldsFragment } from "@/graphql/generated/graphql";

export const Category = ({
	name: title,
	description: desc,
	"data-testid": testId = "category",
	subcategories,
}: CategoryProps) => {
	const filteredSubcategories = (
		subcategories?.filter((sub): sub is SubcategoryFieldsFragment =>
			Boolean(sub),
		) || []
	).map(({ name, description, fullSlug }) => ({
		name,
		description,
		fullSlug,
	}));

	return (
		<Container as="section" data-testid={testId}>
			<div className="flex flex-col gap-10">
				<div className="flex flex-col items-start gap-4">
					<div className="flex flex-col gap-2">
						<h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
							{title}
						</h2>
						<p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-lg">
							{desc}
						</p>
					</div>
				</div>
				<CardsLayout
					items={filteredSubcategories}
					data-testid={`${testId}-cards-layout`}
				/>
			</div>
		</Container>
	);
};
