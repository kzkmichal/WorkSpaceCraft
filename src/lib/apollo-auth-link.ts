import { IncomingHttpHeaders } from "http";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { setContext } from "@apollo/client/link/context";

type ContextHeaders = {
	headers?: IncomingHttpHeaders;
};
// Link for server-side
export const createServerAuthLink = async () => {
	const session = await getServerSession();

	return setContext((_, { headers }: ContextHeaders) => ({
		headers: {
			...headers,
			authorization: session?.accessToken
				? `Bearer ${session.accessToken}`
				: "",
		},
	}));
};

// Link for client-side
export const clientAuthLink = setContext(
	async (_, { headers }: ContextHeaders) => {
		const session = await getSession();

		return {
			headers: {
				...headers,
				authorization: session?.accessToken
					? `Bearer ${session.accessToken}`
					: "",
			},
		};
	},
);
