import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

pkg.exports = {
  ".": {
    import: "./dist/index.js",
  },
  "./server": {
    import: "./dist/index.js",
  },
  "./client": {
    import: "./dist/client.js",
  },
};

pkg.main = "dist/index.js";
pkg.types = "dist/index.d.ts";

fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
console.log("Adjusted exports for production build in packages/s3");
