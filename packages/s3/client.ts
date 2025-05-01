export async function uploadToPresignedUrl(
  presignedUrl: string,
  fileInput: File | Buffer,
  onProgress?: (progress: number) => void // Callback for progress tracking
): Promise<void> {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    if (!(fileInput instanceof File)) {
      throw new Error("In browser, fileInput must be a File");
    }

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", fileInput.type);

    // Set up the progress event listener
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };
    }

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Presigned upload successful (browser)");
          resolve();
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed: Network error"));
      };

      xhr.send(fileInput);
    });
  } else {
    // Server-side logic remains unchanged
    const url = new URL(presignedUrl);
    const https = await import("https");

    return new Promise((resolve, reject) => {
      const options = {
        method: "PUT",
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: {
          "Content-Length": (fileInput as Buffer).length,
        },
      };

      const req = https.request(options, (res) => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          console.log("Presigned upload successful (server)");
          resolve();
        } else {
          reject(
            new Error(
              `Presigned upload failed with status code ${res.statusCode}`
            )
          );
        }
      });

      req.on("error", reject);
      req.write(fileInput);
      req.end();
    });
  }
}
