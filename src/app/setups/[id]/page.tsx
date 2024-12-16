import { notFound } from "next/navigation";

export default function SetupPage({
	params,
}: {
	params: { id: string };
}) {
	// TODO: Fetch setup data based on params.id
	const setup = null; // Replace with actual data fetching

	if (!setup) {
		notFound();
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Setup Details</h1>
			{/* TODO: Add setup details */}
		</div>
	);
}
