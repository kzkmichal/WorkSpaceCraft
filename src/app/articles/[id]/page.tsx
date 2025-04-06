import { notFound } from "next/navigation";

type ArticlesPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function ArticlePage(props: ArticlesPageProps) {
	const params = await props.params;

	const article = null; // Replace with actual data fetching

	if (!article) {
		notFound();
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Article</h1>
			{/* TODO: Add article content */}
			{params.id}
		</div>
	);
}
