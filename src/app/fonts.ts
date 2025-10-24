import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

export const jakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	display: "swap",
	variable: "--font-jakarta-sans",
});

export const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-dm-sans",
});
