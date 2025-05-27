import { Suspense } from "react";
import VideosPageClient from "./VideosPageClient";

export default function VideosPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideosPageClient />
    </Suspense>
  );
}
