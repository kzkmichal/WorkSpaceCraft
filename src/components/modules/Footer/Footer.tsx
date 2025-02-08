import { FooterProps } from "./types";
import { Link } from "@/components/common/atoms/Link";
import { Container } from "@/components/common/molecules";

const footerLinks = {
	product: {
		title: "Product",
		links: [
			{ href: "/categories", label: "Categories" },
			{ href: "/setups", label: "Setups" },
			{ href: "/guides", label: "Guides" },
			{ href: "/community", label: "Community" },
		],
	},
	company: {
		title: "Company",
		links: [
			{ href: "/about", label: "About" },
			{ href: "/blog", label: "Blog" },
			{ href: "/careers", label: "Careers" },
			{ href: "/contact", label: "Contact" },
		],
	},
	resources: {
		title: "Resources",
		links: [
			{ href: "/help", label: "Help Center" },
			{ href: "/terms", label: "Terms" },
			{ href: "/privacy", label: "Privacy" },
			{ href: "/cookies", label: "Cookies" },
		],
	},
};

export const Footer = ({
	"data-testid": testId = "footer",
}: FooterProps) => {
	return (
		<Container
			className="w-full border-t"
			as="footer"
			data-testid={testId}
			size={"2xl"}
		>
			<div className="xl:grid xl:grid-cols-5 xl:gap-8">
				{/* Brand section */}
				<div className="xl:col-span-2">
					<h3 className="font-serif text-lg">WorkSpaceCraft</h3>
					<p className="mt-4 max-w-xs text-sm text-gray-600">
						Create your perfect workspace with ergonomic furniture and
						essential accessories.
					</p>
				</div>

				{/* Links section */}
				<div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-3 xl:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-8">
						{Object.entries(footerLinks).map(([key, section]) => (
							<div key={key} className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold">
									{section.title}
								</h3>
								<ul className="mt-4 space-y-4">
									{section.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												variant="ghost"
												className="text-sm text-gray-600 hover:text-gray-900"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom section */}
			<div className="mt-12 border-t pt-8">
				<p className="text-sm text-gray-600">
					© {new Date().getFullYear()} WorkSpaceCraft. All rights
					reserved.
				</p>
			</div>
		</Container>
	);
};
