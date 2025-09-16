import { Home, Building2, Wifi } from "lucide-react";
import { Category } from "./types";

export const categories: Category[] = [
	{
		id: "home",
		title: "Home",
		description:
			"Transform your home into a productive workspace with carefully curated furniture and accessories designed for comfort and efficiency.",
		image:
			"https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=2940",
		link: "/home",
		icon: Home,
		images: [
			"https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=2940",
			"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940",
			"https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2938",
			"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2942",
			"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2926",
			"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958",
		],
		buttonText: "Explore Home Solutions",
	},
	{
		id: "office",
		title: "Office",
		description:
			"Professional office solutions engineered for maximum productivity, comfort, and collaborative work environments.",
		image:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2801",
		link: "/office",
		icon: Building2,
		images: [
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2801",
			"https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2969",
			"https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?q=80&w=2940",
			"https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2940",
			"https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2940",
			"https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=2940",
		],
		buttonText: "Explore Office Solutions",
	},
	{
		id: "remote",
		title: "Remote",
		description:
			"Essential tools and portable solutions for digital nomads and remote workers who need flexibility without compromising quality.",
		image:
			"https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938",
		link: "/remote",
		icon: Wifi,
		images: [
			"https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938",
			"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940",
			"https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874",
			"https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940",
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940",
			"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2940",
		],
		buttonText: "Explore Remote Solutions",
	},
];
