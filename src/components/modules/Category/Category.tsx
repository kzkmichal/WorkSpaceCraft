import { CategoryProps } from "./types";
import { CardsLayout } from "./Components/CardsLayout";
import { Container } from "@/components/common/molecules";

export const Category = ({
	title,
	desc,
	subcategories,
	"data-testid": testId = "category",
}: CategoryProps) => (
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
				items={subcategories}
				data-testid={`${testId}-cards-layout`}
			/>
		</div>
	</Container>
);
