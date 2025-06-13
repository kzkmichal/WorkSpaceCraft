import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "01-Design Tokens/Colors",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<Meta>;

const ColorSwatch = ({
	name,
	cssClass,
	description = "",
	hasForeground = false,
	showAlphaVariants = false,
}: {
	name: string;
	cssClass: string;
	description?: string;
	hasForeground?: boolean;
	showAlphaVariants?: boolean;
}) => {
	const alphaLevels = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

	return (
		<div className="mb-8">
			<h3 className="mb-3 text-lg font-semibold">{name}</h3>
			{description && (
				<p className="mb-3 text-sm text-muted-foreground">
					{description}
				</p>
			)}

			<div className="grid grid-cols-1 gap-2">
				<div className="flex items-center gap-4">
					<div
						className={`h-16 w-16 rounded-lg border ${hasForeground ? `text-${cssClass}-foreground` : ""}`}
						style={{
							backgroundColor: `hsl(var(--${cssClass}))`,
						}}
					>
						{hasForeground && (
							<div className="flex h-full w-full items-center justify-center font-medium">
								Aa
							</div>
						)}
					</div>
					<div>
						<code className="font-mono text-sm">{cssClass}</code>
						{hasForeground && (
							<>
								<br />
								<code className="font-mono text-sm text-muted-foreground">
									text-{cssClass}-foreground
								</code>
							</>
						)}
					</div>
				</div>

				{showAlphaVariants && (
					<div className="mt-2">
						<p className="mb-2 text-sm text-muted-foreground">
							Alpha variants:
						</p>
						<div className="flex flex-wrap gap-2">
							{alphaLevels.map((alpha) => (
								<div
									key={alpha}
									className="flex flex-col items-center"
								>
									<div
										className={`h-12 w-12 rounded border`}
										style={{
											backgroundColor: `hsl(var(--${cssClass}) / ${alpha / 100})`,
										}}
									/>
									<span className="mt-1 text-xs">{alpha}%</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const ColorVariants: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">Color Variants</h2>
			<div className="grid grid-cols-1 gap-8">
				<ColorSwatch
					name="Primary"
					cssClass="primary"
					hasForeground={true}
					showAlphaVariants={true}
				/>
				<ColorSwatch
					name="Secondary"
					cssClass="secondary"
					hasForeground={true}
					showAlphaVariants={true}
				/>
				<ColorSwatch
					name="Destructive"
					cssClass="destructive"
					hasForeground={true}
					showAlphaVariants={true}
				/>
				<ColorSwatch
					name="Accent"
					cssClass="accent"
					hasForeground={true}
					showAlphaVariants={true}
				/>
				<ColorSwatch
					name="Muted"
					cssClass="muted"
					hasForeground={true}
					showAlphaVariants={true}
				/>
			</div>
		</div>
	),
};

export const AllColors: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">Color System</h2>

			<section className="mb-12">
				<h3 className="mb-4 text-xl font-bold">Theme Colors</h3>
				<div className="grid grid-cols-2 gap-8">
					<ColorSwatch
						name="Primary"
						cssClass="primary"
						hasForeground={true}
					/>
					<ColorSwatch
						name="Primary Foreground"
						cssClass="primary-foreground"
					/>
					<ColorSwatch
						name="Secondary"
						cssClass="secondary"
						hasForeground={true}
					/>
					<ColorSwatch
						name="Secondary Foreground"
						cssClass="secondary-foreground"
					/>
					<ColorSwatch
						name="Accent"
						cssClass="accent"
						hasForeground={true}
					/>
					<ColorSwatch
						name="Accent Foreground"
						cssClass="accent-foreground"
					/>
					<ColorSwatch
						name="Destructive"
						cssClass="destructive"
						hasForeground={true}
					/>
					<ColorSwatch
						name="Destructive Foreground"
						cssClass="destructive-foreground"
					/>
				</div>
			</section>

			<section className="mb-12">
				<h3 className="mb-4 text-xl font-bold">
					UI Component Colors
				</h3>
				<div className="grid grid-cols-2 gap-8">
					<ColorSwatch name="Background" cssClass="background" />
					<ColorSwatch name="Foreground" cssClass="foreground" />
					<ColorSwatch name="Card" cssClass="card" />
					<ColorSwatch
						name="Card Foreground"
						cssClass="card-foreground"
					/>
					<ColorSwatch name="Popover" cssClass="popover" />
					<ColorSwatch
						name="Popover Foreground"
						cssClass="popover-foreground"
					/>
					<ColorSwatch name="Muted" cssClass="muted" />
					<ColorSwatch
						name="Muted Foreground"
						cssClass="muted-foreground"
					/>
				</div>
			</section>

			<section className="mb-12">
				<h3 className="mb-4 text-xl font-bold">Utility Colors</h3>
				<div className="grid grid-cols-2 gap-8">
					<ColorSwatch name="Border" cssClass="border" />
					<ColorSwatch name="Input" cssClass="input" />
					<ColorSwatch name="Ring" cssClass="ring" />
					<ColorSwatch name="Radius" cssClass="radius" />
				</div>
			</section>

			<section className="mb-12">
				<h3 className="mb-4 text-xl font-bold">
					Chart and Visualization
				</h3>
				<div className="grid grid-cols-2 gap-8">
					<ColorSwatch name="Chart-1" cssClass="chart-1" />
					<ColorSwatch name="Chart-2" cssClass="chart-2" />
					<ColorSwatch name="Chart-3" cssClass="chart-3" />
					<ColorSwatch name="Chart-4" cssClass="chart-4" />
					<ColorSwatch name="Chart-5" cssClass="chart-5" />
				</div>
			</section>
		</div>
	),
};

export const ContrastDemo: Story = {
	render: () => (
		<div className="p-6">
			<h2 className="mb-6 text-2xl font-bold">
				Color Contrast Examples
			</h2>

			<div className="grid grid-cols-1 gap-6">
				{[
					{
						bg: "bg-primary",
						text: "text-primary-foreground",
						label: "Primary",
					},
					{
						bg: "bg-secondary",
						text: "text-secondary-foreground",
						label: "Secondary",
					},
					{
						bg: "bg-destructive",
						text: "text-destructive-foreground",
						label: "Destructive",
					},
					{
						bg: "bg-accent",
						text: "text-accent-foreground",
						label: "Accent",
					},
					{
						bg: "bg-muted",
						text: "text-muted-foreground",
						label: "Muted",
					},
					{
						bg: "bg-card",
						text: "text-card-foreground",
						label: "Card",
					},
				].map(({ bg, text, label }) => (
					<div key={label} className={`rounded-lg p-4 ${bg} ${text}`}>
						<h3 className="font-bold">{label} Background</h3>
						<p>
							This text uses {label.toLowerCase()}-foreground color
							for optimal contrast.
						</p>
						<p className="mt-2 text-sm opacity-75">
							Secondary text with reduced opacity.
						</p>
					</div>
				))}
			</div>
		</div>
	),
};
