import Link from "next/link";
import Image from "next/image";
import { SubCategoryProps } from "./types";
import { Container } from "@/components/common/molecules";
import { ProductImageFragment } from "@/graphql/generated/graphql";

export const SubCategory = ({
	name,
	description,
	products,
	fullSlug,
}: SubCategoryProps) => {
	const setProductImage = (
		images?: (ProductImageFragment | undefined)[],
	) => images?.find((image) => image?.isPrimary)?.url || undefined;

	return (
		<Container paddingY={"2xl"}>
			<div className="mx-auto">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col items-start gap-4">
						<div className="flex flex-col gap-2">
							<h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
								{name}
							</h2>
							<p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-lg">
								{description}
							</p>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{products &&
							products.map((product, index) => (
								<Link
									href={`/${fullSlug}/${product?.id}`}
									key={index}
									className="w-full"
								>
									<div className="flex flex-col gap-2" key={index}>
										<div className="relative mb-2 aspect-video rounded-md bg-muted">
											{product?.images && (
												<Image
													objectFit="cover"
													src={setProductImage(product?.images) || ""}
													alt={product?.title}
													fill
													className="absolute h-full w-full rounded-md"
												/>
											)}
										</div>
										<h3 className="text-xl tracking-tight">
											{product?.title}
										</h3>
										<p className="text-muted-foreground text-base">
											{product?.description}
										</p>
									</div>
								</Link>
							))}
					</div>
				</div>
			</div>
		</Container>
	);
};
