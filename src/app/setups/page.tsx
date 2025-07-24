import { SetupList } from "@/components/modules/Setups/SetupList";

export default async function SetupsPage() {
	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Workspace Setups</h1>
			<SetupList />
		</div>
	);
}
