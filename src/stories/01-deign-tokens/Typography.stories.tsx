import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "01-Design Tokens/Typography",
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const TypeDemo = ({
	className,
	label,
	description,
	code,
}: {
	className: string;
	label: string;
	description?: string;
	code: string;
}) => (
	<div className="mb-8 border-b pb-6">
		<div className="mb-2 flex items-baseline justify-between">
			<h3 className="text-sm font-medium text-muted-foreground">
				{label}
			</h3>
			<code className="text-xs text-muted-foreground">{code}</code>
		</div>
		<div className={className}>
			The quick brown fox jumps over the lazy dog
		</div>
		{description && (
			<p className="mt-2 text-sm text-muted-foreground">
				{description}
			</p>
		)}
	</div>
);

export const FontFamilies: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">Font Families</h2>

			<TypeDemo
				className="font-serif text-2xl"
				label="Serif - Headings"
				description="DM Serif Text - used for headings"
				code="font-serif"
			/>

			<TypeDemo
				className="font-sans text-base"
				label="Sans - Body Text"
				description="Inter - used for body text"
				code="font-sans"
			/>

			<TypeDemo
				className="font-mono text-base"
				label="Monospace - Code"
				description="System monospace - used for code"
				code="font-mono"
			/>
		</div>
	),
};

export const FontSizes: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">Font Sizes</h2>

			<TypeDemo
				className="font-serif text-6xl"
				label="6XL - Hero headings"
				code="text-6xl"
			/>

			<TypeDemo
				className="font-serif text-5xl"
				label="5XL - Large headings"
				code="text-5xl"
			/>

			<TypeDemo
				className="font-serif text-4xl"
				label="4XL - Page headings"
				code="text-4xl"
			/>

			<TypeDemo
				className="font-serif text-3xl"
				label="3XL - Section headings"
				code="text-3xl"
			/>

			<TypeDemo
				className="font-serif text-2xl"
				label="2XL - Subsection headings"
				code="text-2xl"
			/>

			<TypeDemo
				className="font-serif text-xl"
				label="XL - Small headings"
				code="text-xl"
			/>

			<TypeDemo
				className="text-lg"
				label="LG - Large body text"
				code="text-lg"
			/>

			<TypeDemo
				className="text-base"
				label="BASE - Default body text"
				code="text-base"
			/>

			<TypeDemo
				className="text-sm"
				label="SM - Small text"
				code="text-sm"
			/>

			<TypeDemo
				className="text-xs"
				label="XS - Caption text"
				code="text-xs"
			/>

			<TypeDemo
				className="text-2xs"
				label="2XS - Tiny text"
				code="text-2xs"
			/>
		</div>
	),
};

export const FontStyles: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">
				Font Weights & Styles
			</h2>

			<TypeDemo
				className="text-base font-light"
				label="Light"
				code="font-light"
			/>

			<TypeDemo
				className="text-base font-normal"
				label="Normal"
				code="font-normal"
			/>

			<TypeDemo
				className="text-base font-medium"
				label="Medium"
				code="font-medium"
			/>

			<TypeDemo
				className="text-base font-semibold"
				label="Semibold"
				code="font-semibold"
			/>

			<TypeDemo
				className="text-base font-bold"
				label="Bold"
				code="font-bold"
			/>

			<TypeDemo
				className="text-base italic"
				label="Italic"
				code="italic"
			/>

			<TypeDemo
				className="text-base underline"
				label="Underline"
				code="underline"
			/>
		</div>
	),
};

export const Spacing: Story = {
	render: () => (
		<div className="space-y-12 p-6">
			<div>
				<h2 className="mb-6 text-2xl font-bold">Line Heights</h2>

				<div className="mb-8">
					<h3 className="mb-2 text-sm font-medium text-muted-foreground">
						Tight - leading-tight
					</h3>
					<p className="rounded bg-accent/10 p-4 text-base leading-tight">
						This paragraph demonstrates tight line height. It's useful
						for headings and short pieces of text where you want more
						compact spacing between lines.
					</p>
				</div>

				<div className="mb-8">
					<h3 className="mb-2 text-sm font-medium text-muted-foreground">
						Normal - leading-normal
					</h3>
					<p className="rounded bg-accent/10 p-4 text-base leading-normal">
						This paragraph demonstrates normal line height. It's the
						default setting that works well for most body text content
						throughout your application.
					</p>
				</div>

				<div className="mb-8">
					<h3 className="mb-2 text-sm font-medium text-muted-foreground">
						Relaxed - leading-relaxed
					</h3>
					<p className="rounded bg-accent/10 p-4 text-base leading-relaxed">
						This paragraph demonstrates relaxed line height. It
						provides more breathing room between lines, making it
						ideal for longer reading sessions and improving
						readability for body text.
					</p>
				</div>
			</div>

			<div>
				<h2 className="mb-6 text-2xl font-bold">Letter Spacing</h2>

				<TypeDemo
					className="text-base tracking-tighter"
					label="Tighter"
					code="tracking-tighter"
				/>

				<TypeDemo
					className="text-base tracking-tight"
					label="Tight"
					code="tracking-tight"
				/>

				<TypeDemo
					className="text-base tracking-normal"
					label="Normal"
					code="tracking-normal"
				/>

				<TypeDemo
					className="text-base tracking-wide"
					label="Wide"
					code="tracking-wide"
				/>

				<TypeDemo
					className="text-base tracking-wider"
					label="Wider"
					code="tracking-wider"
				/>

				<TypeDemo
					className="text-base tracking-widest"
					label="Widest"
					code="tracking-widest"
				/>
			</div>
		</div>
	),
};

export const InContext: Story = {
	render: () => (
		<div className="mx-auto max-w-4xl p-6">
			<article className="prose prose-lg">
				<h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-foreground">
					The Art of Remote Work
				</h1>

				<p className="text-muted-foreground">
					Published on March 15, 2024 · 5 min read
				</p>

				<h2 className="mt-8 font-serif text-3xl font-normal leading-tight tracking-tight text-foreground">
					Introduction
				</h2>

				<p className="text-base leading-relaxed">
					Remote work has revolutionized the way we think about
					productivity and work-life balance. In this comprehensive
					guide, we'll explore the best practices, tools, and
					strategies for creating an effective remote work
					environment.
				</p>

				<h3 className="mt-6 font-serif text-2xl font-normal leading-snug tracking-tight text-foreground">
					Essential Tools for Remote Workers
				</h3>

				<ul className="space-y-2 text-base">
					<li>Video conferencing software</li>
					<li>Project management tools</li>
					<li>Cloud storage solutions</li>
					<li>Time tracking applications</li>
				</ul>

				<blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
					"The future of work is not just remote, it's asynchronous.
					We're moving towards a world where productivity is measured
					by output, not hours logged." - Jane Doe, Remote Work Expert
				</blockquote>

				<h4 className="mt-6 font-serif text-xl font-normal leading-snug tracking-tight text-foreground">
					Setting Up Your Home Office
				</h4>

				<p className="text-base leading-relaxed">
					The physical environment plays a crucial role in remote work
					success. Consider these key elements when designing your
					workspace:
				</p>

				<ol className="list-inside list-decimal space-y-2 text-base">
					<li>Ergonomic furniture that supports good posture</li>
					<li>Proper lighting to reduce eye strain</li>
					<li>Noise-canceling headphones for focus</li>
					<li>High-speed internet connection</li>
				</ol>

				<p className="mt-8 border-t pt-4 text-sm text-muted-foreground">
					This article demonstrates the proper use of typography
					hierarchy, spacing, and styles throughout a typical content
					page.
				</p>
			</article>
		</div>
	),
};
