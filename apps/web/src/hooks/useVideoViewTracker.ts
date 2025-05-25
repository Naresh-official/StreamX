"use client";

import { recordVideoView } from "@workspace/api-client";
import { getSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export function useVideoViewTracker(videoId: string | null) {
  const hasTrackRef = useRef(false);

  useEffect(() => {
    if (!videoId || hasTrackRef.current) return;

    const trackView = async () => {
      const session = await getSession();
      const userId = session?.user?.id || "";
      await recordVideoView(videoId, userId);
      hasTrackRef.current = true;
    };

    trackView();
  }, [videoId]);
}
