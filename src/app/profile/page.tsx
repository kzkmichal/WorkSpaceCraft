import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getClient } from "@/lib/apollo-server";
import { MeDocument, MeQuery } from "@/graphql/generated/graphql";

export default async function ProfilePage() {
	const session = await getServerSession();

	if (!session) {
		redirect("/auth/signin");
	}

	try {
		const client = await getClient();
		const response = await client.query<MeQuery>({
			query: MeDocument,
		});

		const user = response.data.me;

		if (!user) {
			return <div>No user data available</div>;
		}

		return (
			<div className="container mx-auto mt-8 max-w-2xl">
				<div className="rounded-lg border p-6 shadow-lg">
					<h1 className="mb-6 text-2xl font-bold">Profile</h1>

					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium text-gray-500">
								Name
							</label>
							<p className="text-lg">{user.name}</p>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-500">
								Email
							</label>
							<p className="text-lg">{user.email}</p>
						</div>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching user data:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		return <div>Error loading profile data</div>;
	}
}
