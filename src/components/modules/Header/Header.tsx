import { Navigation } from "./components/Navigation";
import { Container } from "@/components/common/molecules/Container";
import { BaseProps } from "@/components/utils/types";

export type HeaderProps = BaseProps;

export const Header = ({
	"data-testid": testId = "header",
}: HeaderProps) => {
	return (
		<Container
			as="header"
			data-testid={testId}
			className="z-10 w-full bg-white shadow-md"
			paddingY="sm"
			size={"full"}
		>
			<Navigation />
		</Container>
	);
};
