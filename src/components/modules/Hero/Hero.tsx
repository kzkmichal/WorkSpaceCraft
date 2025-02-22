"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Stack } from "../../common/molecules/Stack";
import { BaseProps } from "@/components/utils/types";

type Category = BaseProps & {
	title: string;
	description: string;
	image: string;
	link: string;
	subcategories: string[];
	thumbnails: string[];
};

const categories: Category[] = [
	{
		id: "home",
		title: "Home",
		description:
			"Create your perfect home workspace with ergonomic furniture and essential accessories.",
		image:
			"https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=2940",
		link: "/categories/home",
		subcategories: [
			"Furniture",
			"Health",
			"Tech",
			"Storage",
			"Lighting",
		],
		thumbnails: [
			"https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=2940",
			"https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=2940",
		],
	},
	{
		id: "office",
		title: "Office",
		description:
			"Professional solutions for modern offices and collaborative spaces.",
		image:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2801",
		link: "/categories/office",
		subcategories: [
			"Furniture",
			"Collaboration",
			"Tech",
			"Meeting Rooms",
			"Acoustics",
		],
		thumbnails: [
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2801",
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2801",
		],
	},
	{
		id: "remote",
		title: "Remote",
		description:
			"Portable setups and gear for the digital nomad lifestyle.",
		image: "/images/categories/remote/remote.jpg",
		link: "/categories/remote",
		subcategories: [
			"Bags",
			"Portable Tech",
			"Accessories",
			"Travel Gear",
			"Mobile Workstation",
		],
		thumbnails: [
			"/images/categories/remote/thumb1.jpg",
			"/images/categories/remote/thumb2.jpg",
		],
	},
];

export const Hero = () => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	return (
		<div className="relative">
			<div className="relative h-[700px] w-full bg-black">
				{/* Main Image */}
				<div className="absolute inset-0 w-full md:w-2/3">
					<div className="relative h-full w-full">
						<Image
							src={activeCategory.image}
							alt={activeCategory.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>

				{/* Thumbnails */}
				<div className="absolute right-0 top-0 h-full md:w-1/3">
					<div className="grid h-full grid-rows-2">
						{activeCategory.thumbnails.map((thumb, index) => (
							<div key={index} className="relative h-full w-full">
								<Image
									src={thumb}
									alt={`${activeCategory.title} view ${index + 1}`}
									fill
									className="object-cover"
								/>
							</div>
						))}
					</div>
				</div>
				<Stack
					className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/70 p-8 backdrop-blur-sm md:w-auto lg:left-2/3"
					spacing={{ "": 4, md: 8 }}
					data-testid="box"
				>
					<p className="text-sm font-light tracking-wider text-gray-800">
						DISCOVER YOUR PERFECT WORKSPACE
					</p>

					<div className="flex gap-16">
						<div className="flex flex-col space-y-6">
							{categories.map((category) => (
								<button
									key={category.id}
									onClick={() => setActiveCategory(category)}
									className={`border-b pb-2 text-left transition-colors ${
										activeCategory.id === category.id
											? "border-gray-900"
											: "border-transparent opacity-60 hover:opacity-100"
									}`}
								>
									<span className="text-4xl text-gray-900">
										{category.title}
									</span>
								</button>
							))}
						</div>

						<div className="flex flex-col space-y-3 pt-2">
							{activeCategory.subcategories.map((subcategory) => (
								<a
									key={subcategory}
									href={`/categories/${activeCategory.id}/${subcategory.toLowerCase()}`}
									className="text-lg text-gray-700 transition-colors hover:text-gray-900"
								>
									{subcategory}
								</a>
							))}
						</div>
					</div>

					<p className="h-[2lh] w-full text-lg font-light leading-relaxed text-gray-700 md:w-[30rem]">
						{activeCategory.description}
					</p>

					<a
						href={activeCategory.link}
						className="inline-flex items-center justify-center border border-gray-900 bg-white px-8 py-3 text-sm font-light text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
					>
						Explore {activeCategory.title}
					</a>
				</Stack>
			</div>
		</div>
	);
};
