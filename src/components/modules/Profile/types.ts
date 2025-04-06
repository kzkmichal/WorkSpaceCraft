import { BaseProps } from "@/components/utils/types";
import { UserFieldsFragment } from "@/graphql/generated/graphql";

export type ProfileProps = BaseProps &
	Pick<UserFieldsFragment, "name" | "email" | "image" | "id">;
