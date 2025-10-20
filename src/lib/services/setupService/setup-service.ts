import {
	PrismaClient,
	SetupCategory,
	SetupStatus,
} from "@prisma/client";
import { Mutations } from "./mutations";
import { SetupFormatter } from "./setup-formatter";

export class SetupService {
	constructor(
		private prisma: PrismaClient,
		private mutations: Mutations = new Mutations(prisma),
	) {}

	async getUserSetups(userId: string) {
		try {
			const userSetups = await this.prisma.setup.findMany({
				where: { userId },
				include: {
					user: true,
				},
				orderBy: { createdAt: "desc" },
			});

			return SetupFormatter.formatUserSetups(userSetups);
		} catch (error) {
			console.error(
				`Error fetching setups for user ${userId}:`,
				error,
			);
			throw new Error("Failed to fetch setups for user");
		}
	}

	async getSetupById(id: string) {
		try {
			const setup = await this.prisma.setup.findUnique({
				where: { id },
				include: {
					user: true,
					products: {
						include: {
							product: {
								include: {
									createdBy: true,
									images: true,
									categories: true,
									subcategories: { include: { subcategory: true } },
									tags: { include: { tag: true } },
									dimensions: true,
									technicalFeatures: true,
									prosCons: true,
									userExperience: true,
									reviews: true,
								},
							},
						},
						orderBy: { order: "asc" },
					},
				},
			});

			return setup ? SetupFormatter.formatSetup(setup) : null;
		} catch (error) {
			console.error(`Error fetching Setup ${id}:`, error);
			throw new Error("Failed to fetch setup");
		}
	}

	async getSetupByCategory(category: SetupCategory, userId?: string) {
		if (userId === undefined) {
			return null;
		}
		try {
			const setup = await this.prisma.setup.findUnique({
				where: {
					userId_category: { userId: userId, category },
				},
				include: {
					user: true,
					products: {
						include: {
							product: {
								include: {
									createdBy: true,
									images: true,
									categories: true,
									subcategories: { include: { subcategory: true } },
									tags: { include: { tag: true } },
									dimensions: true,
									technicalFeatures: true,
									prosCons: true,
									userExperience: true,
									reviews: true,
								},
							},
						},
						orderBy: { order: "asc" },
					},
				},
			});

			return setup ? SetupFormatter.formatSetup(setup) : null;
		} catch (error) {
			console.error(
				`Error fetching setups for category ${category}:`,
				error,
			);
			throw new Error("Failed to fetch setups for category");
		}
	}

	async getAllSetups(
		category?: SetupCategory,
		status: SetupStatus = SetupStatus.PUBLISHED,
		limit: number = 20,
		offset: number = 0,
	) {
		try {
			const setups = await this.prisma.setup.findMany({
				where: {
					...(category && { category }),
					...(status && { status }),
				},
				include: {
					user: true,
					_count: { select: { products: true } },
				},
				take: limit,
				skip: offset,
				orderBy: { createdAt: "desc" },
			});

			return SetupFormatter.formatUserSetups(setups);
		} catch (error) {
			console.error("Error fetching all setups:", error);
			throw new Error("Failed to fetch setups");
		}
	}

	async createSetup(
		userId: string,
		category: SetupCategory,
		title: string,
		description?: string,
		imageUrl?: string,
	) {
		return this.mutations.createSetup(
			userId,
			category,
			title,
			description,
			imageUrl,
		);
	}

	async updateSetup(
		setupId: string,
		userId: string,
		title?: string,
		description?: string | null,
		imageUrl?: string | null,
		status?: SetupStatus,
	) {
		return this.mutations.updateSetup(
			setupId,
			userId,
			title,
			description,
			imageUrl,
			status,
		);
	}

	async deleteSetup(setupId: string, userId: string) {
		return this.mutations.deleteSetup(setupId, userId);
	}

	async addProductToSetup(
		setupId: string,
		productId: string,
		userId: string,
	) {
		return this.mutations.addProductToSetup(
			setupId,
			productId,
			userId,
		);
	}

	async removeProductFromSetup(
		setupId: string,
		productId: string,
		userId: string,
	) {
		return this.mutations.removeProductFromSetup(
			setupId,
			productId,
			userId,
		);
	}

	async reorderSetupProducts(
		setupId: string,
		productOrders: { productId: string; order: number }[],
		userId: string,
	) {
		return this.mutations.reorderSetupProducts(
			setupId,
			userId,
			productOrders,
		);
	}

	async publishSetup(setupId: string, userId: string) {
		return this.mutations.publishSetup(setupId, userId);
	}

	async canPublishSetup(setupId: string) {
		return this.mutations.canPublishSetup(setupId);
	}

	async isProductInSetup(setupId: string, productId: string) {
		return this.mutations.isProductInSetup(setupId, productId);
	}
}
