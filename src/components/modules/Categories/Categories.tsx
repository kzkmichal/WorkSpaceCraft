import React from "react";
import Link from "next/link";
import { CategoryCard } from "./components/CategoryCard/CategoryCard";
import { CategoriesProps } from "./types";
import { Container } from "@/components/common/molecules";

export const Categories = ({
	categories,
	"data-testid": testId = "categories",
}: CategoriesProps) => {
	return (
		<Container
			wrapperClassName="flex flex-col gap-4 lg:gap-8"
			data-testid={testId}
		>
			{categories?.map((category, i) => (
				<Link
					href={`/${category.name}`}
					key={i}
					className="w-full"
					data-testid={`${testId}-${category.name}-link`}
				>
					<CategoryCard
						key={i}
						{...category}
						reverse={i % 2 > 0}
						data-testid={`${testId}-card-${i}`}
					/>
				</Link>
			))}
		</Container>
	);
};
