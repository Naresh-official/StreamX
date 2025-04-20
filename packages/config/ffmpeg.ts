export const ffmpegOutputOptions = [
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
];

export const ffmpegOutput480pOptions = [
  "-vf",
  "scale=-2:480", // Scale to 480p,
  "-hls_segment_filename",
  "./tmp/480/segment%03d.ts",
];

export const ffmpegOutput720pOptions = [
  "-vf",
  "scale=-2:720", // Scale to 720p,
  "-hls_segment_filename",
  "./tmp/720/segment%03d.ts",
];

export const ffmpegOutput1080pOptions = [
  "-vf",
  "scale=-2:1080", // Scale to 1080p,
  "-hls_segment_filename",
  "./tmp/1080/segment%03d.ts",
];
