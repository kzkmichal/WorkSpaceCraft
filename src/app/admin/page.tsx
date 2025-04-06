import { prisma } from "@/lib/prisma/prisma";
import { AdminDashboard } from "@/components/modules/AdminDashboard";

export default async function AdminPage() {
	const [users, reportedProducts] = await Promise.all([
		prisma.user.findMany({
			take: 5,
			orderBy: { createdAt: "desc" },
		}),

		prisma.product.findMany({
			where: { isReported: true },
			take: 5,
			orderBy: { reportCount: "desc" },
			include: {
				createdBy: true,
			},
		}),
	]);

	const formattedUsers = users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		image: user.image ? user.image : undefined,
		role: user.role,
		createdAt: user.createdAt.toISOString(),
	}));

	const formattedProducts = reportedProducts.map((product) => ({
		id: product.id,
		title: product.title,
		imageUrl: product.imageUrl,
		isReported: product.isReported,
		reportCount: product.reportCount,
		createdBy: product.createdBy.name,
	}));

	return (
		<AdminDashboard
			recentUsers={formattedUsers}
			reportedProducts={formattedProducts}
		/>
	);
}
