import Link from "next/link";
import Image from "next/image";

export type SetupCardProps = {
	id: string;
	title: string;
	imageUrl: string;
	author: string;
};

export const SetupCard = ({
	id,
	title,
	imageUrl,
	author,
}: SetupCardProps) => {
	return (
		<Link href={`/setups/${id}`} className="block">
			<div className="rounded-lg border p-4 transition-shadow hover:shadow-md">
				<Image
					src={imageUrl}
					alt={title}
					className="mb-4 h-48 w-full object-cover"
				/>
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-gray-600">by {author}</p>
			</div>
		</Link>
	);
};
