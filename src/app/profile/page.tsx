import { requireAuth } from "@/lib/session-helpers";
import { prisma } from "@/lib/prisma/prisma";
import { getUserSetups } from "@/hooks/setup";
import { Profile } from "@/components/modules/Profile";
import {
	UserProducts,
	UserSetups,
} from "@/components/modules/User/index";
import { UserFieldsFragment } from "@/graphql/generated/graphql";
import { Container } from "@/components/common/molecules";
import { Link } from "@/components/common/atoms";

type PageProps = {
	searchParams: Promise<{ tab?: string }>;
};

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

const TabNavigation = ({ activeTab }: { activeTab: string }) => {
	const tabs = [
		{ id: "products", label: "Products" },
		{ id: "setups", label: "Setups" },
	];

	return (
		<div className="mb-6 flex gap-2">
			{tabs.map((tab) => (
				<Link
					key={tab.id}
					href={`/profile?tab=${tab.id}`}
					variant={activeTab === tab.id ? "primary" : "ghost"}
					size="sm"
					prefetch={true}
				>
					{tab.label}
				</Link>
			))}
		</div>
	);
};

const ProductsTabs = async ({ userId }: { userId: string }) => {
	const userProducts = await prisma.product.findMany({
		where: {
			userId: userId,
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
		userId: product.userId,
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

	return <UserProducts products={formattedProducts} />;
};

const SetupsTabs = async ({ userId }: { userId: string }) => {
	const setupsData = await getUserSetups(userId);

	const formattedSetups = setupsData.map((setup) => ({
		...setup,
		productCount: 0,
	}));

	return <UserSetups setups={formattedSetups} />;
};

export default async function ProfilePage({
	searchParams,
}: PageProps) {
	const session = await requireAuth();
	const { tab } = await searchParams;

	const activeTab = tab || "products";

	return (
		<>
			<Profile {...(session.user as UserFieldsFragment)} />
			<Container>
				<TabNavigation activeTab={activeTab} />
				{activeTab === "products" && (
					<ProductsTabs userId={session.user.id!} />
				)}
				{activeTab === "setups" && (
					<SetupsTabs userId={session.user.id!} />
				)}
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
