import React from "react";
import { KeyValueInput, KeyValueItem } from "../KeyValueInput";
import {
	ProductDimension,
	COMMON_DIMENSIONS,
	COMMON_UNITS,
} from "@/lib/validations/product";
import { DimensionInputProps } from "./types";

export const DimensionInput: React.FC<DimensionInputProps> = ({
	dimensions,
	onChange,
	error,
	className,
}) => {
	const handleChange = (items: KeyValueItem[]) => {
		const formattedDimensions: ProductDimension[] = items.map(
			(item) => ({
				id: item.id,
				name: item.name,
				value: item.value,
				unit: item.unit,
			}),
		);
		onChange(formattedDimensions);
	};

	const keyValueItems: KeyValueItem[] = dimensions.map((dim) => ({
		id: dim.id,
		name: dim.name,
		value: dim.value,
		unit: dim.unit,
	}));

	return (
		<KeyValueInput
			label="Physical Dimensions"
			items={keyValueItems}
			onChange={handleChange}
			showUnit={true}
			nameOptions={[...COMMON_DIMENSIONS]}
			unitOptions={[...COMMON_UNITS]}
			placeholder={{
				name: "Select dimension...",
				value: "Enter value...",
				unit: "Unit",
			}}
			error={error}
			className={className}
		/>
	);
};
