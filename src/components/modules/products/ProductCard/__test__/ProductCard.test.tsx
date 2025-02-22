import { ProductCard } from "../ProductCard";
import { mockProduct } from "./data";
import { render } from "@/tests/utils/render";

describe("ProductCard", () => {
	it("renders correctly", () => {
		const { getByText } = render(<ProductCard {...mockProduct} />);
		expect(getByText(mockProduct.title)).toBeInTheDocument();
	});
});
