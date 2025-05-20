"use client";

import { recordVideoView } from "@workspace/api-client";
import { useEffect, useRef } from "react";

export function useVideoViewTracker(
  videoId: string | null,
  userId: string | null
) {
  const hasTrackRef = useRef(false);
  useEffect(() => {
    if (!videoId || !userId || hasTrackRef.current) return;

    recordVideoView(videoId, userId);
    hasTrackRef.current = true;
  }, [videoId, userId]);
}
