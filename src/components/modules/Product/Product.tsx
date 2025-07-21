import Image from "next/image";
import { ProductProps } from "./types";
import { Container } from "@/components/common/molecules";
import { TagList } from "@/components/common/molecules/TagList";

export const Product = ({
	title,
	description,
	images,
	price,
	tags,
}: ProductProps) => {
	const imageUrl = images?.find((image) => image?.isPrimary)?.url;

	return (
		<Container>
			<div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
				<div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
					<div className="relative mb-2 aspect-video size-full overflow-hidden rounded-md bg-muted">
						{imageUrl && (
							<Image
								src={imageUrl}
								alt={title}
								layout="fill"
								objectFit="cover"
								objectPosition="center"
							/>
						)}
					</div>
				</div>

				<div className="mt-6 sm:mt-8 lg:mt-0">
					{tags && tags.length > 0 && (
						<div className="mt-3">
							<TagList tags={tags} />
						</div>
					)}

					<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
						{title}
					</h1>
					<div className="mt-4 sm:flex sm:items-center sm:gap-4">
						<p className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
							{price}
						</p>

						<div className="mt-2 flex items-center gap-2 sm:mt-0">
							<div className="flex items-center gap-1">
								<svg
									className="h-4 w-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
								</svg>
								<svg
									className="h-4 w-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
								</svg>
								<svg
									className="h-4 w-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
								</svg>
								<svg
									className="h-4 w-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
								</svg>
								<svg
									className="h-4 w-4 text-yellow-300"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
								</svg>
							</div>
							<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
								(5.0)
							</p>
							<a
								href="#"
								className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
							>
								345 Reviews
							</a>
						</div>
					</div>

					<div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
						<a
							href="#"
							title=""
							className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
							role="button"
						>
							<svg
								className="-ms-2 me-2 h-5 w-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
								/>
							</svg>
							Add to favorites
						</a>
					</div>

					<hr className="my-6 border-gray-200 dark:border-gray-800 md:my-8" />

					<p className="mb-6 text-gray-500 dark:text-gray-400">
						{description}
					</p>
				</div>
			</div>
		</Container>
	);
};
