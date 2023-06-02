<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import Crop from "./Crop.svelte";
	export let image: HTMLImageElement;

	const dispatch = createEventDispatcher();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let canvas_initialized = false;

	let desired_height = 450;
	let crop_size: number;

	onMount(() => {
		console.log("The component has been mounted");
		ctx = canvas.getContext("2d");

		canvas.width = (image.width / image.height) * desired_height;
		canvas.height = desired_height;

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		crop_size = Math.min(canvas.width, canvas.height);
		canvas_initialized = true;
	});
</script>

<div class="backdrop" />
<div class="modal card">
	<div class="editor">
		{#if canvas_initialized}
			<Crop {canvas} bind:size={crop_size} />
		{/if}
		<canvas bind:this={canvas} />
	</div>
	{#if canvas}
		<input
			type="range"
			min="1"
			max={Math.min(canvas.width, canvas.height)}
			bind:value={crop_size}
		/>
	{/if}
	<button on:click={() => dispatch("complete")}>Done</button>
</div>

<style lang="scss">
	.editor {
		display: grid;
		place-content: center;
		position: relative;
		overflow: hidden;
		width: fit-content;
		margin-inline: auto;
	}
	canvas {
		max-width: 100%;
	}
	input {
		width: 100%;
	}
	.modal {
		position: fixed;
		margin: auto;
		padding-top: 3rem;
		inset: 10vmin 10vmin;
		z-index: 10;
	}
	.backdrop {
		z-index: 10;
		position: fixed;
		inset: 0;
		background: #0008;
	}
</style>
