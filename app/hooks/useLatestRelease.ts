import { useEffect, useState } from "react";
import {
  buildRelease,
  fetchLatestRelease,
  type LatestRelease,
} from "@/lib/latestRelease";

// Renders the build-time release immediately, then swaps to the live
// GitHub release once the API answers. See lib/latestRelease.ts.
export function useLatestRelease(): LatestRelease {
  const [release, setRelease] = useState(buildRelease);
  useEffect(() => {
    let cancelled = false;
    void fetchLatestRelease().then((live) => {
      if (live && !cancelled) setRelease(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return release;
}
