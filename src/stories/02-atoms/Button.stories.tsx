import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@/components/common/atoms/Button";
import {
	Search,
	ShoppingCart,
	Heart,
	Download,
	ArrowRight,
	CheckCircle,
	Trash2,
	Edit,
	Plus,
} from "lucide-react";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
	title: "02-Atoms/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: [
				"primary",
				"secondary",
				"outline",
				"ghost",
				"destructive",
				"accent",
				"link",
				"default",
			],
			description: "Button appearance variant",
		},
		size: {
			control: "radio",
			options: ["sm", "default", "lg", "icon"],
			description: "Button size",
		},
		isLoading: {
			control: "boolean",
			description: "Whether button is in loading state",
		},
		disabled: {
			control: "boolean",
			description: "Whether button is disabled",
		},
		children: {
			control: "text",
			description: "Button text or content",
		},
		onClick: {
			action: "clicked",
			description: "Function called on click",
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
	args: {
		children: "Button",
		className: "",
		variant: "primary",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="default">Default</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="accent">Accent</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="icon">
				<Search className="h-4 w-4" />
			</Button>
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">Normal</h3>
				<div className="flex gap-4">
					<Button>Normal</Button>
					<Button variant="primary">Primary</Button>
					<Button variant="destructive">Delete</Button>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Disabled</h3>
				<div className="flex gap-4">
					<Button disabled>Disabled</Button>
					<Button variant="primary" disabled>
						Primary Disabled
					</Button>
					<Button variant="destructive" disabled>
						Delete Disabled
					</Button>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Loading</h3>
				<div className="flex gap-4">
					<Button isLoading>Loading</Button>
					<Button variant="primary" isLoading>
						Primary Loading
					</Button>
					<Button variant="destructive" isLoading>
						Delete Loading
					</Button>
				</div>
			</div>
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">Icon Left</h3>
				<div className="flex gap-4">
					<Button>
						<Search className="mr-2 h-4 w-4" />
						Search
					</Button>
					<Button variant="primary">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
					<Button variant="destructive">
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</Button>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Icon Right</h3>
				<div className="flex gap-4">
					<Button>
						Next
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
					<Button variant="primary">
						Download
						<Download className="ml-2 h-4 w-4" />
					</Button>
					<Button variant="outline">
						Submit
						<CheckCircle className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Icon Only</h3>
				<div className="flex gap-4">
					<Button size="icon">
						<Search className="h-4 w-4" />
					</Button>
					<Button size="icon" variant="primary">
						<Heart className="h-4 w-4" />
					</Button>
					<Button size="icon" variant="outline">
						<Edit className="h-4 w-4" />
					</Button>
					<Button size="icon" variant="destructive">
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	),
};

export const InContext: Story = {
	render: () => (
		<div className="max-w-md space-y-8">
			<div className="rounded-lg border p-6">
				<h3 className="mb-4 text-lg font-medium">Form Example</h3>
				<div className="space-y-4">
					<input
						type="email"
						placeholder="Enter your email"
						className="w-full rounded-md border px-3 py-2"
					/>
					<div className="flex gap-2">
						<Button variant="primary" className="flex-1">
							Subscribe
						</Button>
						<Button variant="outline">Cancel</Button>
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg border">
				<img
					src="https://via.placeholder.com/400x200"
					alt="Product"
					className="h-48 w-full object-cover"
				/>
				<div className="p-4">
					<h3 className="mb-1 font-medium">Product Title</h3>
					<p className="mb-4 text-sm text-muted-foreground">$29.99</p>
					<div className="flex gap-2">
						<Button variant="primary" size="sm" className="flex-1">
							<ShoppingCart className="mr-2 h-4 w-4" />
							Add to Cart
						</Button>
						<Button variant="outline" size="icon">
							<Heart className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<div className="rounded-lg border bg-card p-6">
				<h3 className="mb-2 text-lg font-medium">Delete Account</h3>
				<p className="mb-4 text-sm text-muted-foreground">
					Are you sure you want to delete your account? This action
					cannot be undone.
				</p>
				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button variant="destructive">
						<Trash2 className="mr-2 h-4 w-4" />
						Delete Account
					</Button>
				</div>
			</div>
		</div>
	),
};

export const Playground: Story = {
	args: {
		children: "Click me",
		variant: "primary",
		size: "default",
		isLoading: false,
		disabled: false,
	},
};

export const ButtonGroups: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-2 text-sm font-medium">
					Inline Button Group
				</h3>
				<div className="flex">
					<Button
						variant="outline"
						className="rounded-r-none border-r-0"
					>
						<Search className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="rounded-none border-r-0"
					>
						One
					</Button>
					<Button
						variant="outline"
						className="rounded-none border-r-0"
					>
						Two
					</Button>
					<Button variant="outline" className="rounded-l-none">
						Three
					</Button>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">
					Spaced Button Group
				</h3>
				<div className="flex gap-2">
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" />
						Add
					</Button>
					<Button variant="outline">
						<Edit className="mr-2 h-4 w-4" />
						Edit
					</Button>
					<Button variant="outline">
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</Button>
				</div>
			</div>
		</div>
	),
};

// Accessibility story
export const Accessibility: Story = {
	render: () => (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Accessibility Examples</h3>

			<div className="flex gap-4">
				<Button aria-label="Close">
					<span aria-hidden="true">×</span>
				</Button>

				<Button>
					<span className="sr-only">Mark as favorite</span>
					<Heart className="h-4 w-4" />
				</Button>

				<Button aria-describedby="submit-help" variant="primary">
					Submit Form
				</Button>
			</div>

			<div className="text-sm text-muted-foreground">
				<p id="submit-help">
					This will save your changes and return you to the previous
					page.
				</p>
			</div>
		</div>
	),
};
