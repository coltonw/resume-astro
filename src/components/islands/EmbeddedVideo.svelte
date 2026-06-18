<script lang="ts">
  // Lazy-loading auto-playing muted video. Hydrated as a Svelte 5 island only
  // when the surrounding container scrolls into view (`client:visible`).
  // Once mounted, IntersectionObserver decides when to load+play and to
  // pause when off-screen. Progress bar at the bottom shows playback
  // position; a spinner shows while metadata/data is still arriving.
  import Redo from "./Redo.svelte";

  let {
    webm,
    mp4,
    width,
    height,
    preload = false,
  }: {
    webm: string;
    mp4: string;
    width: number;
    height: number;
    preload?: boolean;
  } = $props();

  let container: HTMLDivElement | undefined = $state();
  let video: HTMLVideoElement | undefined = $state();
  let playing = $state(false);
  let played = $state(false);
  let loading = $state(false);
  let progress = 0;
  let projectedProgress = $state(0);
  let lastUpdateTime = 0;
  let transitionDuration = $state(0);

  $effect(() => {
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!video) continue;
          if (e.isIntersecting) {
            if (!played) {
              loading = true;
              const p = video.play();
              if (p && typeof p.then === "function") {
                void p.catch(() => {});
              }
              playing = true;
              played = true;
            }
          } else if (playing) {
            video.pause();
            playing = false;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  });

  const replay = () => {
    if (!video) return;
    video.currentTime = 0;
    progress = 0;
    projectedProgress = 0;
    lastUpdateTime = 0;
    transitionDuration = 0;
    playing = true;
    void video.play();
  };

  const onTimeUpdate = () => {
    if (!video || !video.duration || !isFinite(video.duration)) return;
    if (video.currentTime === 0) return;
    const now = performance.now();

    const prevProgress = progress;
    progress = video.currentTime / video.duration;
    const interval =
      lastUpdateTime > 0
        ? now - lastUpdateTime
        : (video.currentTime * 1000) / (video.playbackRate || 1);
    projectedProgress = Math.min(progress + (progress - prevProgress), 1);
    transitionDuration = interval;
    lastUpdateTime = now;
  };
</script>

<div
  bind:this={container}
  class="relative my-6 border-2 border-stone-200 overflow-hidden"
  style="aspect-ratio: {width + 4} / {height + 4}"
>
  {#if loading && !playing && !played}
    <div
      class="absolute inset-0 grid place-items-center bg-stone-50/70"
      aria-hidden="true"
    >
      <div
        class="w-8 h-8 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin"
      ></div>
    </div>
  {/if}

  {#if !playing && played}
    <button
      type="button"
      aria-label="Replay video"
      class="absolute inset-0 m-auto w-16 h-16 bg-stone-100 p-2 rounded-lg text-stone-800 cursor-pointer"
      onclick={replay}
    >
      <Redo class="w-full h-full" />
    </button>
  {/if}

  <video
    bind:this={video}
    onloadeddata={() => {
      loading = false;
    }}
    onwaiting={() => {
      loading = true;
    }}
    onplaying={() => {
      loading = false;
    }}
    ontimeupdate={onTimeUpdate}
    onended={() => {
      playing = false;
      projectedProgress = 1;
      transitionDuration = 0;
    }}
    onclick={() => {
      if (!playing && video) {
        playing = true;
        void video.play();
      }
    }}
    playsinline
    muted
    {width}
    {height}
    preload={preload ? "auto" : "metadata"}
    class="w-full h-full block"
  >
    <source type="video/webm" src={webm} />
    <source type="video/mp4" src={mp4} />
  </video>

  <!-- Progress bar pinned to the bottom; 2px tall, dim background, accented fill. -->
  <div
    class="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-200/60 pointer-events-none"
    aria-hidden="true"
  >
    <div
      class="h-full bg-stone-700 transition-[width] ease-linear"
      style="width: {(projectedProgress * 100).toFixed(
        2,
      )}%; transition-duration: {transitionDuration}ms"
    ></div>
  </div>
</div>
