import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

type StoryProps = ComponentProps<typeof Badge>;

const meta: Meta<StoryProps> = {
	component: Badge,
	title: "02-Atoms/Badge",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: {
				type: "radio",
			},
			options: [
				"default",
				"primary",
				"secondary",
				"accent",
				"destructive",
				"outline",
			],
			description: "The variant of the badge",
		},
		isSelected: {
			control: {
				type: "boolean",
			},
		},
		url: {
			control: {
				type: "text",
			},
			description: "The URL to navigate to when the badge is clicked",
		},
		children: {
			control: {
				type: "text",
			},
		},
	},
	args: {
		children: "Badge",
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {
		variant: "primary",
		isSelected: false,
		children: "Badge",
	},
	render: ({ children, ...args }) => (
		<Badge {...args}> {children}</Badge>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Badge variant="default">Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="accent">Accent</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	),
};

export const AllVariantsWithLinks: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Badge variant="default" url="/">
				Default
			</Badge>
			<Badge variant="primary" url="/">
				Primary
			</Badge>
			<Badge variant="secondary" url="/">
				Secondary
			</Badge>
			<Badge variant="accent" url="/">
				Accent
			</Badge>
			<Badge variant="destructive" url="/">
				Destructive
			</Badge>
			<Badge variant="outline" url="/">
				Outline
			</Badge>
		</div>
	),
};

export const AllVariantsSelected: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Badge variant="default" isSelected>
				Default
			</Badge>
			<Badge variant="primary" isSelected>
				Primary
			</Badge>
			<Badge variant="secondary" isSelected>
				Secondary
			</Badge>
			<Badge variant="accent" isSelected>
				Accent
			</Badge>
			<Badge variant="destructive" isSelected>
				Destructive
			</Badge>
			<Badge variant="outline" isSelected>
				Outline
			</Badge>
		</div>
	),
};

export const DifferentLengths: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-4">
				<Badge>A</Badge>
				<Badge>Badge</Badge>
				<Badge>Medium Badge</Badge>
				<Badge>This is a very long badge text</Badge>
			</div>
		</div>
	),
};

export const InContext: Story = {
	render: () => (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Product Tags</h2>
			<div className="flex flex-wrap gap-2">
				<Badge variant="primary">New</Badge>
				<Badge variant="accent">Popular</Badge>
				<Badge variant="secondary">Sale</Badge>
				<Badge variant="destructive">Low Stock</Badge>
			</div>

			<h3 className="mt-6 text-lg font-semibold">Selected Tags:</h3>
			<div className="flex flex-wrap gap-2">
				<Badge variant="primary" isSelected>
					Electronics
				</Badge>
				<Badge variant="secondary" isSelected>
					Home Office
				</Badge>
				<Badge variant="outline">Furniture</Badge>
			</div>
			<h3 className="text-lg font-semibold">Tags with links</h3>
			<div className="flex flex-wrap gap-2">
				<Badge variant="primary" url="/">
					Electronics
				</Badge>
				<Badge variant="secondary" url="/">
					Home Office
				</Badge>
				<Badge variant="outline" url="/">
					Furniture
				</Badge>
			</div>
		</div>
	),
};
