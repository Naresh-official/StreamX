import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

pkg.exports = {
  "./ffmpeg": {
    import: "./dist/ffmpeg.js",
    require: "./dist/ffmpeg.js",
  },
  ".": {
    import: "./dist/index.js",
    require: "./dist/index.js",
  },
};

pkg.main = "dist/index.js";
pkg.types = "dist/index.d.ts";

fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
console.log("Adjusted exports for production build");
