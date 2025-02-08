import Link from "next/link";

export type ArticleCardProps = {
	id: string;
	title: string;
	excerpt: string;
	author: string;
};

export const ArticleCard = ({
	id,
	title,
	excerpt,
	author,
}: ArticleCardProps) => {
	return (
		<Link href={`/articles/${id}`} className="block">
			<div className="rounded-lg border p-4 transition-shadow hover:shadow-md">
				<h3 className="mb-2 text-lg font-semibold">{title}</h3>
				<p className="mb-2 text-gray-600">{excerpt}</p>
				<p className="text-sm text-gray-500">by {author}</p>
			</div>
		</Link>
	);
};
