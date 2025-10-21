import { AdminSidebar } from "@/components/modules/AdminDashboard/Components/AdminSidebar";
import { requireAdmin } from "@/lib/session-helpers";

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
	await requireAdmin();

	return (
		<div className="flex min-h-screen">
			<AdminSidebar />
			<main className="flex-1 p-8">{children}</main>
		</div>
	);
}
