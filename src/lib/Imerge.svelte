<script lang="ts">
	import SplitCircle from "./SplitCircle.svelte";
</script>

<div class="card">
	<svg viewBox="0 0 100 100">
		<!-- <circle cx="50" cy="50" r="50" fill="black" />

		<circle cx="50" cy="50" r="50" fill="black" />
		<circle cx="50" cy="50" r="50" fill="black" />
		<circle cx="50" cy="50" r="50" fill="black" />
		<circle cx="50" cy="50" r="50" fill="black" />
		<rect x="45" y="45" width="10" height="10" fill="black" /> -->
		<SplitCircle x={50} y={50} r={50} depth={1} />
	</svg>
</div>

<style lang="scss">
	svg {
		height: 100%;
		overflow: visible;
		animation: appear 1s ease-out forwards;
		max-width: 100%;
	}
	div {
		display: grid;
		place-items: center;
		padding: 10vmin;
		height: 100%;
	}
	// circle {
	// 	opacity: 0.5;
	// }
	@keyframes appear {
		0% {
			height: 50%;
			opacity: 0;
		}
		100% {
			height: 100%;
			opacity: 1;
		}
	}
</style>
