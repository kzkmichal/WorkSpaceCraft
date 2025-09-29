import React from "react";
import { KeyValueInput, KeyValueItem } from "../KeyValueInput";
import {
	ProductTechnicalFeature,
	COMMON_TECH_FEATURES,
} from "@/lib/validations/product";
import { TechnicalFeatureInputProps } from "./types";

export const TechnicalFeatureInput: React.FC<
	TechnicalFeatureInputProps
> = ({ technicalFeatures, onChange, error, className }) => {
	const handleChange = (items: KeyValueItem[]) => {
		const formattedFeatures: ProductTechnicalFeature[] = items.map(
			(item) => ({
				id: item.id,
				name: item.name,
				value: item.value,
			}),
		);
		onChange(formattedFeatures);
	};

	const keyValueItems: KeyValueItem[] = technicalFeatures.map(
		(feature) => ({
			id: feature.id,
			name: feature.name,
			value: feature.value,
		}),
	);

	return (
		<KeyValueInput
			label="Technical Features"
			items={keyValueItems}
			onChange={handleChange}
			showUnit={false}
			nameOptions={[...COMMON_TECH_FEATURES]}
			placeholder={{
				name: "Select feature...",
				value: "Enter specification...",
			}}
			error={error}
			className={className}
		/>
	);
};
