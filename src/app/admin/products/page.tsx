import { AdminProductList } from "@/components/modules/AdminDashboard/Components/AdminProductList";
import { prisma } from "@/lib/prisma/prisma";

type AdminProductsPageProps = {
	searchParams: Promise<{ page?: string; reported?: string }>;
};

export default async function AdminProductsPage(
	props: AdminProductsPageProps,
) {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;
	const limit = 20;
	const offset = (page - 1) * limit;
	const showReported = searchParams.reported === "true";

	const filter = showReported ? { isReported: true } : {};

	const products = await prisma.product.findMany({
		where: filter,
		take: limit,
		skip: offset,
		orderBy: showReported
			? { reportCount: "desc" }
			: { createdAt: "desc" },
		include: {
			createdBy: true,
			images: true,
		},
	});

	const formattedProducts = products.map((product) => ({
		id: product.id,
		title: product.title,
		price: product.price,
		imageUrl: product.images.find((img) => img.isPrimary)?.url,
		isReported: product.isReported,
		createdAt: product.createdAt.toISOString(),
		createdBy: product.createdBy.name,
	}));

	const totalProducts = await prisma.product.count({ where: filter });

	return (
		<AdminProductList
			products={formattedProducts}
			currentPage={page}
			totalPages={Math.ceil(totalProducts / limit)}
			isReportedView={showReported}
		/>
	);
}
