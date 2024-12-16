"use client";

import { Input } from "@/components/common/atoms/Input";
import { Button } from "@/components/common/atoms/Button";

export type SearchBarProps = {};

export const SearchBar = ({}: SearchBarProps) => {
	return (
		<div className="mb-6 flex">
			<Input
				type="text"
				placeholder="Search..."
				value=""
				onChange={() => {}}
			/>
			<Button onClick={() => {}}>Search</Button>
		</div>
	);
};
