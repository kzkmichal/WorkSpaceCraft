import { ProductUserExperience } from "@/lib/validations/product";

export interface UserExperienceInputProps {
	userExperience: ProductUserExperience | undefined;
	onChange: (userExperience: ProductUserExperience) => void;
	error?: string;
	className?: string;
}
