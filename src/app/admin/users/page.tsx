import { prisma } from "@/lib/prisma/prisma";
import { AdminUserList } from "@/components/modules/AdminDashboard/Components/AdminUserList";

type AdminUsersPageProps = {
	searchParams: Promise<{ page?: string }>;
};

export default async function AdminUsersPage(
	props: AdminUsersPageProps,
) {
	const searchParams = await props.searchParams;

	const page = Number(searchParams.page) || 1;
	const limit = 20;
	const offset = (page - 1) * limit;

	const users = await prisma.user.findMany({
		take: limit,
		skip: offset,
		orderBy: { createdAt: "desc" },
	});

	const formattedUsers = users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		image: user.image ? user.image : undefined,
		role: user.role,
		createdAt: user.createdAt.toISOString(),
	}));

	const totalUsers = await prisma.user.count();

	return (
		<AdminUserList
			users={formattedUsers}
			currentPage={page}
			totalPages={Math.ceil(totalUsers / limit)}
		/>
	);
}
