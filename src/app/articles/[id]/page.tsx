import { notFound } from "next/navigation";

export default function ArticlePage({
	params,
}: {
	params: { id: string };
}) {
	// TODO: Fetch article data based on params.id
	const article = null; // Replace with actual data fetching

	if (!article) {
		notFound();
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Article</h1>
			{/* TODO: Add article content */}
		</div>
	);
}
