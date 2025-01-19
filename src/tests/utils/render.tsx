import React from "react";
import {
	render as rtlRender,
	RenderOptions,
	screen,
	waitFor,
	fireEvent,
} from "@testing-library/react";

import {
	MockedProvider,
	MockedResponse,
} from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
	mocks?: readonly MockedResponse[];
	session?: Session | null;
};

function render(
	ui: React.ReactElement,
	{
		mocks = [],
		session = null,
		...renderOptions
	}: CustomRenderOptions = {},
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<SessionProvider session={session}>
				<MockedProvider mocks={mocks} addTypename={false}>
					{children}
				</MockedProvider>
			</SessionProvider>
		);
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export { render, waitFor, fireEvent, screen };
