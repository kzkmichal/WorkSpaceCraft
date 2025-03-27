import Link from "next/link";
import { DashboardCardProps } from "./types";

export const DashboardCard = ({
	title,
	count,
	linkHref,
	linkText,
	color,
	textColor,
}: DashboardCardProps) => {
	return (
		<div className={`rounded-lg border ${color} p-6`}>
			<div className="flex items-start justify-between">
				<h3 className={`text-lg font-semibold ${textColor}`}>
					{title}
				</h3>
				{count !== undefined && (
					<span className="text-2xl font-bold">{count}</span>
				)}
			</div>
			<div className="mt-4">
				<Link
					href={linkHref}
					className={`text-sm ${textColor} hover:underline`}
				>
					{linkText} →
				</Link>
			</div>
		</div>
	);
};
