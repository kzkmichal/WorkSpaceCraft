import Link from "next/link";
import { SubCategoryProps } from "./types";
import { Container } from "@/components/common/molecules";

export const SubCategory = ({
	name,
	description,
	products,
	fullSlug,
}: SubCategoryProps) => {
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
										<div className="mb-2 aspect-video rounded-md bg-muted"></div>
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
