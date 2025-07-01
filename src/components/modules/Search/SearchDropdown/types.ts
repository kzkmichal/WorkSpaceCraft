import { BaseProps } from "@/components/utils/types";
import { SearchSuggestion } from "@/graphql/generated/graphql";

export type SearchDropdownProps = BaseProps & {
	suggestions: SearchSuggestion[];
	isLoading: boolean;
	query: string;
	onSelect: (suggestion: SearchSuggestion) => void;
	onClose: () => void;
};

export type SuggestionSectionProps = {
	title: string;
	suggestions: SearchSuggestion[];
	onSelect: (suggestion: SearchSuggestion) => void;
};

export type SuggestionItemProps = {
	suggestion: SearchSuggestion;
	onClick: () => void;
};
