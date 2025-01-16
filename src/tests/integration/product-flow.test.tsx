import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent, waitFor } from "../utils/render";
import {
	CreateProductDocument,
	ProductsDocument,
} from "@/graphql/generated/graphql";
import ProductsPage from "@/app/products/page";

describe("Product Flow Integration", () => {
	const mockSession = {
		user: {
			id: "1",
			email: "test@example.com",
			name: "Test User",
			accessToken: "your-access-token",
			expires: "2022-01-01",
		},
		accessToken: "your-access-token",
		expires: "2022-01-01",
	};

	const initialProductsMock = {
		request: {
			query: ProductsDocument,
			variables: { limit: 12, offset: 0 },
		},
		result: {
			data: {
				products: [],
			},
		},
	};

	const createProductMock = {
		request: {
			query: CreateProductDocument,
			variables: {
				input: {
					title: "New Product",
					description: "Test Description",
					price: 99.99,
					category: "test",
					imageUrl: "/test.jpg",
				},
			},
		},
		result: {
			data: {
				createProduct: {
					id: "1",
					title: "New Product",
					description: "Test Description",
					price: 99.99,
					category: "test",
					imageUrl: "/test.jpg",
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
			},
		},
	};

	it("allows user to create and view a new product", async () => {
		render(
			<MockedProvider
				mocks={[initialProductsMock, createProductMock]}
			>
				<ProductsPage searchParams={{ a: "a" }} />
			</MockedProvider>,
			{ session: mockSession },
		);

		await waitFor(() => {
			expect(screen.getByText("Products")).toBeInTheDocument();
		});

		fireEvent.click(
			screen.getByRole("button", { name: /add product/i }),
		);

		fireEvent.change(screen.getByLabelText(/title/i), {
			target: { value: "New Product" },
		});
		fireEvent.change(screen.getByLabelText(/description/i), {
			target: { value: "Test Description" },
		});
		fireEvent.change(screen.getByLabelText(/price/i), {
			target: { value: "99.99" },
		});
		fireEvent.change(screen.getByLabelText(/category/i), {
			target: { value: "test" },
		});

		fireEvent.click(screen.getByRole("button", { name: /submit/i }));

		await waitFor(() => {
			expect(screen.getByText("New Product")).toBeInTheDocument();
		});
	});
});
