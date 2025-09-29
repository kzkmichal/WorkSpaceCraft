import React from "react";
import { Plus, X, Wrench, ExternalLink } from "lucide-react";
import { cn } from "@/components/utils/helpers";
import {
	ProductUserExperience,
	SETUP_DIFFICULTY_OPTIONS,
	COMMON_TOOLS,
	COMPATIBILITY_OPTIONS,
} from "@/lib/validations/product";
import { UserExperienceInputProps } from "./types";

export const UserExperienceInput: React.FC<
	UserExperienceInputProps
> = ({ userExperience, onChange, error, className }) => {
	const data = userExperience || {
		setupDifficulty: "EASY",
		assemblyRequired: false,
		toolsNeeded: [],
		compatibility: [],
		userManualLink: "",
	};

	const updateField = <K extends keyof ProductUserExperience>(
		field: K,
		value: ProductUserExperience[K],
	) => {
		onChange({
			...data,
			[field]: value,
		});
	};

	const addTool = (tool: string) => {
		if (!data.toolsNeeded?.includes(tool)) {
			updateField("toolsNeeded", [...(data.toolsNeeded || []), tool]);
		}
	};

	const removeTool = (tool: string) => {
		updateField(
			"toolsNeeded",
			(data.toolsNeeded || []).filter((t) => t !== tool),
		);
	};

	const addCompatibility = (compatibility: string) => {
		if (!data.compatibility?.includes(compatibility)) {
			updateField("compatibility", [
				...(data.compatibility || []),
				compatibility,
			]);
		}
	};

	const removeCompatibility = (compatibility: string) => {
		updateField(
			"compatibility",
			(data.compatibility || []).filter((c) => c !== compatibility),
		);
	};

	return (
		<div className={cn("space-y-6", className)}>
			<div className="space-y-3">
				<label className="block text-sm font-medium text-gray-700">
					Setup Difficulty
				</label>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					{SETUP_DIFFICULTY_OPTIONS.map((option) => (
						<label
							key={option.value}
							className={cn(
								"relative flex cursor-pointer items-center rounded-lg border p-4 transition-all",
								data.setupDifficulty === option.value
									? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
									: "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
							)}
						>
							<input
								type="radio"
								name="setupDifficulty"
								value={option.value}
								checked={data.setupDifficulty === option.value}
								onChange={(e) =>
									updateField(
										"setupDifficulty",
										e.target.value as any,
									)
								}
								className="sr-only"
							/>
							<div className="flex items-center gap-3">
								<span className="text-2xl">{option.icon}</span>
								<div>
									<div className="text-sm font-medium text-gray-900">
										{option.value.charAt(0) +
											option.value.slice(1).toLowerCase()}
									</div>
									<div className="text-xs text-gray-500">
										{option.label}
									</div>
								</div>
							</div>
						</label>
					))}
				</div>
			</div>
			<div className="space-y-3">
				<label className="flex items-center gap-3">
					<input
						type="checkbox"
						checked={data.assemblyRequired}
						onChange={(e) =>
							updateField("assemblyRequired", e.target.checked)
						}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					<div className="flex items-center gap-2">
						<Wrench className="h-4 w-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">
							Assembly Required
						</span>
					</div>
				</label>
			</div>

			{data.assemblyRequired && (
				<div className="space-y-3">
					<label className="block text-sm font-medium text-gray-700">
						Tools Needed
					</label>
					{(data.toolsNeeded?.length || 0) > 0 && (
						<div className="flex flex-wrap gap-2">
							{(data.toolsNeeded || []).map((tool) => (
								<span
									key={tool}
									className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
								>
									{tool}
									<button
										type="button"
										onClick={() => removeTool(tool)}
										className="ml-1 text-blue-600 hover:text-blue-800"
									>
										<X className="h-3 w-3" />
									</button>
								</span>
							))}
						</div>
					)}
					<div className="flex flex-wrap gap-2">
						{COMMON_TOOLS.filter(
							(tool) => !(data.toolsNeeded || []).includes(tool),
						).map((tool) => (
							<button
								key={tool}
								type="button"
								onClick={() => addTool(tool)}
								className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50"
							>
								<Plus className="h-3 w-3" />
								{tool}
							</button>
						))}
					</div>
				</div>
			)}
			<div className="space-y-3">
				<label className="block text-sm font-medium text-gray-700">
					Compatibility
				</label>
				{(data.compatibility?.length || 0) > 0 && (
					<div className="flex flex-wrap gap-2">
						{(data.compatibility || []).map((comp) => (
							<span
								key={comp}
								className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
							>
								{comp}
								<button
									type="button"
									onClick={() => removeCompatibility(comp)}
									className="ml-1 text-green-600 hover:text-green-800"
								>
									<X className="h-3 w-3" />
								</button>
							</span>
						))}
					</div>
				)}
				<div className="flex flex-wrap gap-2">
					{COMPATIBILITY_OPTIONS.filter(
						(comp) => !(data.compatibility || []).includes(comp),
					).map((comp) => (
						<button
							key={comp}
							type="button"
							onClick={() => addCompatibility(comp)}
							className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<Plus className="h-3 w-3" />
							{comp}
						</button>
					))}
				</div>
			</div>
			<div className="space-y-3">
				<label className="block text-sm font-medium text-gray-700">
					User Manual Link (Optional)
				</label>
				<div className="relative">
					<input
						type="url"
						value={data.userManualLink || ""}
						onChange={(e) =>
							updateField("userManualLink", e.target.value)
						}
						placeholder="https://example.com/manual.pdf"
						className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<ExternalLink className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
				</div>
			</div>

			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};
