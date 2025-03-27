import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/modules/AdminDashboard/Components/AdminSidebar";

export async function generateMetadata() {
	return {
		title: "Admin",
		description: "Admin area",
	};
}

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session || session.user.role !== "ADMIN") {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen">
			<AdminSidebar />
			<main className="flex-1 p-8">{children}</main>
		</div>
	);
}
