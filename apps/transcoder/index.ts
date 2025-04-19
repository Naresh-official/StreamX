import express from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

const app = express();
const port = 8001;

const inputFolder = path.join(__dirname, "videos");
const outputFolder = path.join(__dirname, "videos", "output");

if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder, { recursive: true });
}

// Transcode endpoint
app.post("/transcode", (req, res) => {
	const inputFile = path.join(inputFolder, "input.mp4");

	// Define output files for each resolution
	const output480p = path.join(outputFolder, "480p", "output.m3u8");
	const output720p = path.join(outputFolder, "720p", "output.m3u8");
	const output1080p = path.join(outputFolder, "1080p", "output.m3u8");

	// Create directories for each resolution if they don't exist
	if (!fs.existsSync(path.dirname(output480p))) {
		fs.mkdirSync(path.dirname(output480p), { recursive: true });
	}
	if (!fs.existsSync(path.dirname(output720p))) {
		fs.mkdirSync(path.dirname(output720p), { recursive: true });
	}
	if (!fs.existsSync(path.dirname(output1080p))) {
		fs.mkdirSync(path.dirname(output1080p), { recursive: true });
	}

	// Transcode each resolution
	ffmpeg(inputFile)
		.outputOptions([
			"-preset",
			"veryfast",
			"-g",
			"48", // GOP length for HLS
			"-sc_threshold",
			"0",
			"-c:a",
			"aac",
			"-f",
			"hls",
			"-hls_time",
			"6",
			"-hls_playlist_type",
			"vod",
		])
		// 480p output
		.output(output480p)
		.outputOptions([
			"-vf",
			"scale=-2:480", // Scale to 480p
		])
		// 720p output
		.output(output720p)
		.outputOptions([
			"-vf",
			"scale=-2:720", // Scale to 720p
		])
		// 1080p output
		.output(output1080p)
		.outputOptions([
			"-vf",
			"scale=-2:1080", // Scale to 1080p
		])
		.on("end", () => {
			res.status(200).send({
				message: "Transcoding complete",
				"480p": output480p,
				"720p": output720p,
				"1080p": output1080p,
			});
		})
		.on("error", (err) => {
			res.status(500).send({
				error: "Transcoding failed",
				details: err.message,
			});
		})
		.run();
});

app.listen(port, () => {
	console.log(`Transcoder service running at http://localhost:${port}`);
});
