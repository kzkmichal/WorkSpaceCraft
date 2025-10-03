import { ProductProps } from "./types";
import { ProductDetails } from "./Components/ProductDetails";
import { ProductInformations } from "./Components/ProductInformations";
import { ProductMedia } from "./Components/ProductMedia";
import { Container } from "@/components/common/molecules";

export const Product = ({
	images,
	rating,
	reviewCount,
	...props
}: ProductProps) => {
	return (
		<Container>
			<div className="space-y-6 sm:space-y-8">
				<div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-7">
					<div className="lg:col-span-4">
						<ProductMedia images={images} />
					</div>
					<div className="lg:col-span-3">
						<ProductInformations {...props} />
					</div>
				</div>
				<ProductDetails {...props} />
			</div>
		</Container>
	);
};
