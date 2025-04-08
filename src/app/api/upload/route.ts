import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
	const session = await auth();

	if (!session) {
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401 },
		);
	}

	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ error: "No file provided" },
				{ status: 400 },
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());

		return await new Promise((resolve) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: "workspacecraft/products",
					resource_type: "image",
					public_id: `${Date.now()}-${file.name}`,
				},
				(error, result) => {
					if (error) {
						console.error("Upload error:", error);
						resolve(
							NextResponse.json(
								{ error: "Upload failed" },
								{ status: 500 },
							),
						);
					} else {
						resolve(
							NextResponse.json({
								url: result?.secure_url,
								publicId: result?.public_id,
								fileName: file.name,
							}),
						);
					}
				},
			);

			uploadStream.write(buffer);
			uploadStream.end();
		});
	} catch (error) {
		console.error("Error handling upload:", error);
		return NextResponse.json(
			{ error: "Upload failed" },
			{ status: 500 },
		);
	}
}
