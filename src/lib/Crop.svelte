<script lang="ts">
	import { clamp } from "../utils";

	export let canvas: HTMLCanvasElement;
	export let size: number;
	const ctx = canvas.getContext("2d");

	$: clamp_size(size);

	let x: number, y: number;

	if (canvas.width > canvas.height) {
		x = (canvas.width - canvas.height) / 2;
		y = 0;
	} else {
		x = 0;
		y = (canvas.height - canvas.width) / 2;
	}

	let moving = false;
	let move_start_x: number;
	let move_start_y: number;
	let crop_start_x: number;
	let crop_start_y: number;

	function startMovingCrop(e: MouseEvent) {
		moving = true;
		move_start_x = e.clientX;
		move_start_y = e.clientY;
		crop_start_x = x;
		crop_start_y = y;
	}

	function moveCrop(e: MouseEvent) {
		if (!moving) return;

		const dx = e.clientX - move_start_x;
		const dy = e.clientY - move_start_y;

		x = clamp(0, crop_start_x + dx, canvas.width - size);
		y = clamp(0, crop_start_y + dy, canvas.height - size);
	}

	function clamp_size(size: number) {
		if (x + size > canvas.width) {
			x = canvas.width - size;
		}
		if (y + size > canvas.height) {
			y = canvas.height - size;
		}
	}
</script>

<svelte:window on:mousemove={moveCrop} on:mouseup={() => (moving = false)} />

<div
	class="crop"
	style:--crop-x="{x}px"
	style:--crop-y="{y}px"
	style:--size="{size}px"
	on:mousedown={startMovingCrop}
/>

<style lang="scss">
	.crop {
		backdrop-filter: invert(1);
		-webkit-backdrop-filter: invert(1);
		--color: #000a;
		--occlude-size: 80rem;
		aspect-ratio: 1;
		top: var(--crop-y);
		left: var(--crop-x);
		height: var(--size);
		position: absolute;

		&::before {
			content: "";
			position: absolute;
			height: var(--occlude-size);
			width: var(--occlude-size);
			background-color: var(--color);
			top: calc(var(--occlude-size) * -1);
			left: 0;
			box-shadow: calc(var(--size) - var(--occlude-size))
					calc(var(--occlude-size) + var(--size)) 0 0 var(--color),
				var(--size) var(--occlude-size) 0 0 var(--color),
				calc(-1 * var(--occlude-size)) var(--size) 0 0 var(--color);
		}
		&::after {
			content: "";
			position: absolute;
			inset: 1px;
			backdrop-filter: invert(1);
			-webkit-backdrop-filter: invert(1);
		}
	}
</style>
