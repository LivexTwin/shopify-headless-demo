<!-- Spinner.svelte 
 Spinner from https://www.svgbackgrounds.com/elements/animated-svg-preloaders/
-->
 
<script>
  export let size = 20; // default size
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 200 200"
  class="spinner"
  width={size}
  height={size}
  aria-label="Loading"
  role="img"
>
  <radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
    <stop offset="0" stop-color="#000000" />
    <stop offset=".3" stop-color="#000000" stop-opacity=".9" />
    <stop offset=".6" stop-color="#000000" stop-opacity=".6" />
    <stop offset=".8" stop-color="#000000" stop-opacity=".3" />
    <stop offset="1" stop-color="#000000" stop-opacity="0" />
  </radialGradient>
  <circle
    transform-origin="center"
    fill="none"
    stroke="url(#a10)"
    stroke-width="15"
    stroke-linecap="round"
    stroke-dasharray="200 1000"
    stroke-dashoffset="0"
    cx="100"
    cy="100"
    r="70"
  >
    <animateTransform
      type="rotate"
      attributeName="transform"
      calcMode="spline"
      dur="2"
      values="360;0"
      keyTimes="0;1"
      keySplines="0 0 1 1"
      repeatCount="indefinite"
    />
  </circle>
  <circle
    transform-origin="center"
    fill="none"
    opacity=".2"
    stroke="#000000"
    stroke-width="15"
    stroke-linecap="round"
    cx="100"
    cy="100"
    r="70"
  />
</svg>

<style>
  .spinner {
    display: inline-block;
    vertical-align: middle;
  }
</style>
