import { notFound } from "next/navigation";

type SetupProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function SetupPage(props: SetupProps) {
	// TODO: Fetch setup data based on params.id
	const params = await props.params; // Replace with actual data fetching

	const setup = null;

	if (!setup) {
		notFound();
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Setup Details</h1>
			{/* TODO: Add setup details */}
			{params.id}
		</div>
	);
}
