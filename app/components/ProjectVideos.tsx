"use client";

import { useRef, useState } from "react";
import { videos } from "../lib/content";

export default function ProjectVideos() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const play = (idx: number) => {
    refs.current.forEach((v, i) => {
      if (i !== idx && v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    const v = refs.current[idx];
    if (v) {
      v.play();
      setPlaying(idx);
    }
  };

  return (
    <div className="vid-grid">
      {videos.map((v, i) => (
        <figure key={v.src} className="vid-card rv">
          <div className="vid-frame">
            <video
              ref={(el) => {
                refs.current[i] = el;
              }}
              src={v.src}
              playsInline
              preload="metadata"
              controls={playing === i}
              className="pc-video"
              onEnded={() => setPlaying(null)}
            />
            {playing !== i && (
              <button className="pc-play" type="button" onClick={() => play(i)} aria-label={`Play ${v.label}`}>
                <i className="fas fa-play" aria-hidden="true"></i>
              </button>
            )}
          </div>
          <figcaption>{v.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
