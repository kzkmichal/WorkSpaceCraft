import Image from "next/image";
import { ProfileProps } from "./types";
import { Container } from "@/components/common/molecules";

export const Profile = ({
	name,
	email,
	image,
	role,
}: ProfileProps) => {
	return (
		<Container>
			<div className="border-accent bg-card rounded-lg border p-6 shadow-lg">
				<h1 className="mb-6 text-2xl font-bold">Profile</h1>

				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-gray-500">
							Name
						</label>
						<p className="text-lg">{name}</p>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-500">
							Email
						</label>
						<p className="text-lg">{email}</p>
					</div>
					{image && (
						<div>
							<label className="text-sm font-medium text-gray-500">
								Image
							</label>
							{image && (
								<Image
									src={image}
									alt={name || ""}
									className="mt-2 h-24 w-24 rounded-full"
								/>
							)}
						</div>
					)}
					<div>
						<label className="text-sm font-medium text-gray-500">
							Role:
						</label>
						<p className="text-lg">{role}</p>
					</div>
				</div>
			</div>
		</Container>
	);
};
