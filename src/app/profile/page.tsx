import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Profile } from "@/components/modules";
import { UserFieldsFragment } from "@/graphql/generated/graphql";

export async function generateMetadata() {
	return {
		title: "Profile",
		description: "User profile page",
		openGraph: {
			title: "Profile | WorkSpaceCraft",
			description: "User profile page",
		},
	};
}

export default async function ProfilePage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/signin");
	}

	return <Profile {...(session.user as UserFieldsFragment)} />;
}
