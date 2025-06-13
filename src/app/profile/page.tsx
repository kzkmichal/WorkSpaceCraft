import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { Profile } from "@/components/modules/Profile";
import { UserProducts } from "@/components/modules/User/Components/UserProducts";
import { UserFieldsFragment } from "@/graphql/generated/graphql";
import { Container } from "@/components/common/molecules";
import { Link } from "@/components/common/atoms";

export async function generateMetadata() {
	return {
		title: "My Profile",
		description: "Manage your account and products",
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

	const userProducts = await prisma.product.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: { createdAt: "desc" },
		include: {
			categories: true,
			images: true,
			subcategories: {
				include: {
					subcategory: true,
				},
			},
		},
	});

	const formattedProducts = userProducts.map((product) => ({
		id: product.id,
		title: product.title,
		price: product.price,
		imageUrl: product.images.find((img) => img.isPrimary)?.url,
		isReported: product.isReported,
		reportCount: product.reportCount || 0,
		categories: product.categories.map((pc) => pc.categoryType),
		subcategories: product.subcategories.map(
			(ps) => ps.subcategory.name,
		),
	}));

	return (
		<>
			<Profile {...(session.user as UserFieldsFragment)} />
			<Container>
				<h2 className="mb-4 text-2xl font-bold">My Products</h2>
				<UserProducts products={formattedProducts} />
			</Container>
			<Container as={"section"}>
				<div className="rounded-lg border border-accent bg-card p-6 shadow-sm">
					<h2 className="mb-2 text-xl font-semibold">
						Want to share a product?
					</h2>
					<p className="mb-4 text-gray-600">
						Share your favorite remote work products with the
						community.
					</p>
					<div className="flex items-center justify-between gap-6">
						<Link href="/products/add" variant="primary" size="sm">
							Add New Product
						</Link>
					</div>
				</div>
			</Container>
		</>
	);
}
