import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function HlsPlayer({ url }) {
  const player = useRef(null);

  useEffect(() => {
    let hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(player.current);
  }, []);

  return (
    <video
      ref={player}
      controls
      className="h-auto w-full rounded-sm md:h-full md:w-auto"
    >
      <track kind="captions" />
    </video>
  );
}
