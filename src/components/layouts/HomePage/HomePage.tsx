import { HomePageProps } from "./types";
import { Container } from "@/components/common/helpers/Container";
import { Hero } from "@/components/common/organisms/Hero/Hero";

export const HomePage = ({
	"data-testid": testId = "home",
}: HomePageProps) => {
	return (
		<>
			<Container
				size={"2xl"}
				data-testid={`${testId}-hero`}
				as="section"
			>
				<Hero />
			</Container>
		</>
	);
};
