import { SetupCard } from "@/components/modules/setups/SetupCard";

export type SetupListProps = {};

export const SetupList = ({}: SetupListProps) => {
	// TODO: Fetch setups data
	const setups = [{ id: 1 }]; // Replace with actual data

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{setups.map((setup) => (
				<SetupCard key={setup.id} {...setup} />
			))}
		</div>
	);
};
