import { SETUP_ERRORS, SETUP_LIMITS } from "@/lib/validations/setup";
import {
	PrismaClient,
	SetupCategory,
	SetupStatus,
} from "@prisma/client";

export class Mutations {
	constructor(private prisma: PrismaClient) {}

	async createSetup(
		userId: string,
		category: SetupCategory,
		title: string,
		description?: string,
		imageUrl?: string,
	) {
		try {
			const setup = await this.prisma.setup.findUnique({
				where: {
					userId_category: { userId, category },
				},
			});

			if (setup) {
				throw new Error(SETUP_ERRORS.ALREADY_EXISTS);
			}

			const result = await this.prisma.setup.create({
				data: {
					category,
					title,
					description,
					imageUrl,
					userId,
					status: SetupStatus.DRAFT,
				},
			});
			return result;
		} catch (error) {
			console.error("Error creating setup:", error);
			throw error;
		}
	}

	async updateSetup(
		setupId: string,
		userId: string,
		title?: string,
		description?: string | null,
		imageUrl?: string | null,
		status?: SetupStatus,
	) {
		try {
			const setup = await this.prisma.setup.findUnique({
				where: { id: setupId },
			});

			if (!setup) {
				throw new Error(SETUP_ERRORS.NOT_FOUND);
			}

			if (setup.userId !== userId) {
				throw new Error(SETUP_ERRORS.UNAUTHORIZED);
			}

			const updatedSetup = await this.prisma.setup.update({
				where: { id: setupId },
				data: {
					...(title !== undefined && { title }),
					...(description !== undefined && { description }),
					...(imageUrl !== undefined && { imageUrl }),
					...(status !== undefined && { status }),
				},
			});

			return updatedSetup;
		} catch (error) {
			console.error("Error updating setup:", error);
			throw error;
		}
	}

	async deleteSetup(setupId: string, userId: string) {
		try {
			const setup = await this.prisma.setup.findUnique({
				where: { id: setupId },
			});

			if (!setup) {
				throw new Error(SETUP_ERRORS.NOT_FOUND);
			}

			if (setup.userId !== userId) {
				throw new Error(SETUP_ERRORS.UNAUTHORIZED);
			}

			await this.prisma.setup.delete({
				where: { id: setupId },
			});

			return true;
		} catch (error) {
			console.error("Error deleting setup:", error);
			throw error;
		}
	}

	async addProductToSetup(
		setupId: string,
		productId: string,
		userId: string,
	) {
		try {
			const setup = await this.prisma.setup.findUnique({
				where: { id: setupId },
				include: { products: true },
			});

			if (!setup) {
				throw new Error(SETUP_ERRORS.NOT_FOUND);
			}

			if (setup.userId !== userId) {
				throw new Error(SETUP_ERRORS.UNAUTHORIZED);
			}

			const product = await this.prisma.product.findUnique({
				where: { id: productId },
			});

			if (!product) {
				throw new Error(SETUP_ERRORS.PRODUCT_NOT_FOUND);
			}

			if (product.deletedAt) {
				throw new Error(SETUP_ERRORS.PRODUCT_DELETED);
			}

			const existingProduct =
				await this.prisma.setupProduct.findUnique({
					where: { setupId_productId: { setupId, productId } },
				});

			if (existingProduct) {
				throw new Error(SETUP_ERRORS.PRODUCT_ALREADY_IN_SETUP);
			}

			if (setup.products.length >= SETUP_LIMITS.MAX_PRODUCTS) {
				throw new Error(SETUP_ERRORS.MAX_PRODUCTS_REACHED);
			}

			const maxOrder = setup.products.reduce(
				(max, p) => Math.max(max, p.order),
				0,
			);

			const setupProduct = await this.prisma.setupProduct.create({
				data: {
					setupId,
					productId,
					order: maxOrder + 1,
				},
			});

			return setupProduct;
		} catch (error) {
			console.error("Error adding product to setup:", error);
			throw error;
		}
	}

	async removeProductFromSetup(
		setupId: string,
		productId: string,
		userId: string,
	) {
		const setup = await this.prisma.setup.findUnique({
			where: { id: setupId },
		});

		if (!setup) {
			throw new Error(SETUP_ERRORS.NOT_FOUND);
		}

		if (setup.userId !== userId) {
			throw new Error(SETUP_ERRORS.UNAUTHORIZED);
		}

		const setupProduct = await this.prisma.setupProduct.findUnique({
			where: {
				setupId_productId: { setupId, productId },
			},
		});

		if (!setupProduct) {
			throw new Error(SETUP_ERRORS.PRODUCT_NOT_IN_SETUP);
		}

		await this.prisma.setupProduct.delete({
			where: {
				setupId_productId: { setupId, productId },
			},
		});

		return true;
	}

	async reorderSetupProducts(
		setupId: string,
		userId: string,
		productOrders: Array<{ productId: string; order: number }>,
	) {
		const setup = await this.prisma.setup.findUnique({
			where: { id: setupId },
			include: { products: true },
		});

		if (!setup) {
			throw new Error(SETUP_ERRORS.NOT_FOUND);
		}

		if (setup.userId !== userId) {
			throw new Error(SETUP_ERRORS.UNAUTHORIZED);
		}

		const setupProductIds = setup.products.map((p) => p.productId);
		const requestedProductIds = productOrders.map(
			(po) => po.productId,
		);

		const allBelong = requestedProductIds.every((id) =>
			setupProductIds.includes(id),
		);

		if (!allBelong) {
			throw new Error("Some products do not belong to this setup");
		}

		await this.prisma.$transaction(
			productOrders.map((po) =>
				this.prisma.setupProduct.update({
					where: {
						setupId_productId: {
							setupId,
							productId: po.productId,
						},
					},
					data: { order: po.order },
				}),
			),
		);

		return true;
	}

	async publishSetup(setupId: string, userId: string) {
		const setup = await this.prisma.setup.findUnique({
			where: { id: setupId },
			include: {
				_count: { select: { products: true } },
			},
		});

		if (!setup) {
			throw new Error(SETUP_ERRORS.NOT_FOUND);
		}

		if (setup.userId !== userId) {
			throw new Error(SETUP_ERRORS.UNAUTHORIZED);
		}

		if (setup._count.products < SETUP_LIMITS.MIN_PRODUCTS) {
			throw new Error(SETUP_ERRORS.MIN_PRODUCTS_REQUIRED);
		}

		if (setup.title.length < SETUP_LIMITS.MIN_TITLE_LENGTH) {
			throw new Error(SETUP_ERRORS.INVALID_TITLE);
		}

		const updatedSetup = await this.prisma.setup.update({
			where: { id: setupId },
			data: { status: SetupStatus.PUBLISHED },
		});

		return updatedSetup;
	}

	async canPublishSetup(setupId: string): Promise<{
		canPublish: boolean;
		reason?: string;
	}> {
		const setup = await this.prisma.setup.findUnique({
			where: { id: setupId },
			include: {
				_count: { select: { products: true } },
			},
		});

		if (!setup) {
			return { canPublish: false, reason: SETUP_ERRORS.NOT_FOUND };
		}

		if (setup._count.products < SETUP_LIMITS.MIN_PRODUCTS) {
			return {
				canPublish: false,
				reason: SETUP_ERRORS.MIN_PRODUCTS_REQUIRED,
			};
		}

		if (setup.title.length < SETUP_LIMITS.MIN_TITLE_LENGTH) {
			return {
				canPublish: false,
				reason: SETUP_ERRORS.INVALID_TITLE,
			};
		}

		return { canPublish: true };
	}

	async isProductInSetup(
		setupId: string,
		productId: string,
	): Promise<boolean> {
		const setupProduct = await this.prisma.setupProduct.findUnique({
			where: {
				setupId_productId: { setupId, productId },
			},
		});

		return !!setupProduct;
	}
}
