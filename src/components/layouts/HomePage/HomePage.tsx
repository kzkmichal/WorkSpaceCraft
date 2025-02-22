import { HomePageProps } from "./types";
import { Container } from "@/components/common/molecules/Container";
import { Hero } from "@/components/modules/Hero/Hero";

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
