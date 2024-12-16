import Link from "next/link";

export type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
	return (
		<header className="bg-white shadow-md">
			<nav className="container mx-auto px-6 py-3">
				<ul className="flex space-x-4">
					<li>
						<Link
							href="/"
							className="text-gray-800 hover:text-gray-600"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/products"
							className="text-gray-800 hover:text-gray-600"
						>
							Products
						</Link>
					</li>
					<li>
						<Link
							href="/setups"
							className="text-gray-800 hover:text-gray-600"
						>
							Setups
						</Link>
					</li>
					<li>
						<Link
							href="/articles"
							className="text-gray-800 hover:text-gray-600"
						>
							Articles
						</Link>
					</li>
					<li>
						<Link
							href="/profile"
							className="text-gray-800 hover:text-gray-600"
						>
							Profile
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
