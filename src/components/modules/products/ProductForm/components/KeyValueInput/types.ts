export type KeyValueItem = {
	id?: string;
	name: string;
	value: string;
	unit?: string;
};

export type KeyValueInputProps = {
	label: string;
	items: KeyValueItem[];
	onChange: (items: KeyValueItem[]) => void;
	placeholder?: {
		name?: string;
		value?: string;
		unit?: string;
	};
	showUnit?: boolean;
	unitOptions?: string[];
	nameOptions?: string[];
	error?: string;
	className?: string;
};
