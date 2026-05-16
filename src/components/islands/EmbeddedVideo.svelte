<script lang="ts">
  // Lazy-loading auto-playing muted video. Hydrated as a Svelte 5 island only
  // when the surrounding container scrolls into view (`client:visible`).
  // Once mounted, IntersectionObserver decides when to load+play and to
  // pause when off-screen. No scroll listeners, no throttle, no lodash.
  import Redo from './Redo.svelte';

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

  $effect(() => {
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!video) continue;
          if (e.isIntersecting) {
            // Either play it (after first play, on re-entry let user click replay)
            if (!played) {
              const p = video.play();
              if (p && typeof p.then === 'function') void p.catch(() => {});
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
    playing = true;
    void video.play();
  };
</script>

<div
  bind:this={container}
  class="relative my-6 border-2 border-stone-200"
  style="aspect-ratio: {width + 4} / {height + 4}"
>
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
    onended={() => {
      playing = false;
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
    preload={preload ? 'auto' : 'metadata'}
  >
    <source type="video/webm" src={webm} />
    <source type="video/mp4" src={mp4} />
  </video>
</div>
