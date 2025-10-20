import { SetupProduct } from "@prisma/client";
import { formatDates, formatUser } from "../common/formatter-utils";
import { ProductFormatter } from "../productService/product-formatter";
import { CompleteSetup, SetupWithUser } from "../common/types";

const formatSetupProduct = (setupProduct: SetupProduct) => ({
	id: setupProduct.id,
	setupId: setupProduct.setupId,
	productId: setupProduct.productId,
	order: setupProduct.order,
	createdAt: setupProduct.createdAt.toISOString(),
});

export class SetupFormatter {
	static formatUserSetups(setups: SetupWithUser[]) {
		return setups.map((setup) => ({
			...setup,
			...formatDates(setup),
			description: setup.description || undefined,
			imageUrl: setup.imageUrl || undefined,
			user: formatUser(setup.user),
			products: [],
		}));
	}

	static formatSetup(setup: CompleteSetup) {
		return {
			...setup,
			...formatDates(setup),
			description: setup.description || undefined,
			imageUrl: setup.imageUrl || undefined,
			user: formatUser(setup.user),
			products: setup.products.map((sp) => ({
				...formatSetupProduct(sp),
				product: ProductFormatter.formatProduct(sp.product),
			})),
		};
	}
	static formatSetupProduct(setupProduct: SetupProduct) {
		return formatSetupProduct(setupProduct);
	}
}
