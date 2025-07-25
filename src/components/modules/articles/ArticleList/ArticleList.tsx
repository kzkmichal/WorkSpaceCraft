import { ArticleCard } from "@/components/modules/Articles/ArticleCard/ArticleCard";
import { BaseProps } from "@/components/utils/types";

export type ArticleListProps = BaseProps;

export const ArticleList = ({}: ArticleListProps) => {
	// TODO: Fetch articles data
	const articles = [{ id: "1" }]; // Replace with actual data

	return (
		<div className="space-y-6">
			{articles.map((article) => (
				<ArticleCard key={article.id} {...article} />
			))}
		</div>
	);
};
