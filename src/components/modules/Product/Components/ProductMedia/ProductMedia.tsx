"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import { ProductMediaProps } from "./types";

export const ProductMedia = ({ images }: ProductMediaProps) => {
	const [selectedMediaIndex, setSelectedMediaIndex] = useState(
		images?.findIndex((img) => img?.isPrimary) || 0,
	);
	// const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	// const [isVideoMuted, setIsVideoMuted] = useState(true);
	const [viewCount, setViewCount] = useState(1247);
	// const videoRef = useRef<HTMLVideoElement>(null);

	// const handleVideoToggle = () => {
	// 	if (videoRef.current) {
	// 		if (isVideoPlaying) {
	// 			videoRef.current.pause();
	// 		} else {
	// 			videoRef.current.play();
	// 		}
	// 		setIsVideoPlaying(!isVideoPlaying);
	// 	}
	// };

	// const handleMuteToggle = () => {
	// 	if (videoRef.current) {
	// 		videoRef.current.muted = !isVideoMuted;
	// 		setIsVideoMuted(!isVideoMuted);
	// 	}
	// };

	const currentMedia = images && images[selectedMediaIndex];

	return (
		<div className="overflow-hidden rounded-xl border border-border/60 bg-card">
			<div className="relative flex aspect-square items-center justify-center bg-muted">
				{
					currentMedia?.url && (
						<Image
							layout="fill"
							objectFit="cover"
							objectPosition="center"
							className="rounded-md"
							src={currentMedia.url}
							alt={currentMedia?.fileName || ""}
						/>
					)
					// <div className="relative h-full w-full">
					// 	<video
					// 		ref={videoRef}
					// 		src={currentMedia.url}
					// 		poster={currentMedia.thumbnail}
					// 		className="h-full w-full object-cover"
					// 		muted={isVideoMuted}
					// 		loop
					// 	/>
					// 	<div className="absolute inset-0 flex items-center justify-center">
					// 		<div className="flex gap-3">
					// 			<Button
					// 				size="icon"
					// 				variant="secondary"
					// 				onClick={handleVideoToggle}
					// 				className="rounded-full border-0 bg-black/60 text-white hover:bg-black/80"
					// 			>
					// 				{isVideoPlaying ? (
					// 					<Pause className="h-5 w-5" />
					// 				) : (
					// 					<Play className="h-5 w-5" />
					// 				)}
					// 			</Button>
					// 			<Button
					// 				size="icon"
					// 				variant="secondary"
					// 				onClick={handleMuteToggle}
					// 				className="rounded-full border-0 bg-black/60 text-white hover:bg-black/80"
					// 			>
					// 				{isVideoMuted ? (
					// 					<VolumeX className="h-5 w-5" />
					// 				) : (
					// 					<Volume2 className="h-5 w-5" />
					// 				)}
					// 			</Button>
					// 		</div>
					// 	</div>
					// </div>
				}
				{/* {currentMedia.caption && (
									<div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white">
										{currentMedia.caption}
									</div>
								)} */}
				<div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white">
					<Eye className="h-3.5 w-3.5" />
					{viewCount.toLocaleString()}
				</div>
			</div>

			<div className="border-t border-border bg-gradient-to-br from-card via-card to-card/95 p-3 shadow-sm">
				<div className="flex gap-2 overflow-x-auto pb-1">
					{images?.map(
						(media, index) =>
							media?.url && (
								<button
									key={index}
									onClick={() => setSelectedMediaIndex(index)}
									className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
										selectedMediaIndex === index
											? "border-primary"
											: "border-transparent hover:border-border"
									}`}
								>
									<Image
										src={media.url}
										alt={media.fileName || ""}
										layout="fill"
										objectFit="cover"
										objectPosition="center"
										className="rounded-md"
									/>
									{/* {media.type === "video" && (
												<div className="absolute inset-0 flex items-center justify-center bg-black/20">
													<Play className="h-4 w-4 text-white" />
												</div>
											)} */}
								</button>
							),
					)}
				</div>
			</div>
		</div>
	);
};
