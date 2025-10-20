import { Container } from "@/components/common/molecules";
import { SetupsGalleryProps } from "./types";
import { SetupCategory } from "@/graphql/generated/graphql";
import Link from "next/link";
import { cn } from "@/components/utils/helpers";
import {
	getCategoryIcon,
	getCategoryLabel,
	getCategoryUrl,
} from "../../User/Components/UserSetups/utils";
import { Button } from "@/components/ui/button";
import { SetupCard } from "../SetupCard";

export const SetupsGallery = ({
	setups,
	activeCategory,
	totalCount,
	currentPage,
}: SetupsGalleryProps) => {
	return (
		<Container>
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Workspace Setups</h1>
				<p className="text-muted-foreground">
					Discover inspiring workspace setups from our community
				</p>
			</div>
			<div className="mb-8 flex flex-wrap gap-2 rounded-lg bg-muted p-1">
				<Link
					href="/setups"
					className={cn(
						"inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
						!activeCategory
							? "bg-background text-foreground shadow-sm"
							: "text-muted-foreground hover:bg-background/50 hover:text-foreground",
					)}
				>
					{` ${!!totalCount} ? All (${totalCount}) : All`}
				</Link>

				{(
					["HOME_OFFICE", "OFFICE", "REMOTE_WORK"] as SetupCategory[]
				).map((cat) => (
					<Link
						key={cat}
						href={`/setups?category=${getCategoryUrl(cat)}`}
						className={cn(
							"inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
							activeCategory === cat
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:bg-background/50 hover:text-foreground",
						)}
					>
						{getCategoryIcon(cat)} {getCategoryLabel(cat)}
					</Link>
				))}
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{setups?.map((setup) => (
					<SetupCard key={setup.id} {...setup} isOwner={false} />
				))}
			</div>
			{totalCount && (
				<div className="mt-8 flex justify-center gap-2">
					{currentPage > 1 && (
						<Link href={`/setups?page=${currentPage - 1}`}>
							<Button variant="outline">Previous</Button>
						</Link>
					)}

					<span className="px-4 py-2">
						Page {currentPage} of {Math.ceil(totalCount / 20)}
					</span>

					{currentPage < Math.ceil(totalCount / 20) && (
						<Link href={`/setups?page=${currentPage + 1}`}>
							<Button variant="outline">Next</Button>
						</Link>
					)}
				</div>
			)}
		</Container>
	);
};
