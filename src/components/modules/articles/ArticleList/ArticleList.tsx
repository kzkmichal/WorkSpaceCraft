import { ArticleCard } from "@/components/modules/articles/ArticleCard/ArticleCard";

export type ArticleListProps = {};

export const ArticleList = ({}: ArticleListProps) => {
	// TODO: Fetch articles data
	const articles = [{ id: 1 }]; // Replace with actual data

	return (
		<div className="space-y-6">
			{articles.map((article) => (
				<ArticleCard key={article.id} {...article} />
			))}
		</div>
	);
};
