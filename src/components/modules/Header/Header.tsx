import { Navigation } from "./components/Navigation";
import { Container } from "@/components/common/molecules/Container";
import { BaseProps } from "@/components/utils/types";
import { getCategories } from "@/hooks/getCategories";

export type HeaderProps = BaseProps;

export const Header = async ({
	"data-testid": testId = "header",
}: HeaderProps) => {
	const categories = await getCategories();
	return (
		<Container
			as="header"
			data-testid={testId}
			className="sticky top-0 z-50 w-full bg-background shadow-md"
			paddingY="md"
			size={"2xl"}
		>
			<Navigation categories={categories} />
		</Container>
	);
};
