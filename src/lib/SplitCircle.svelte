<script context="module">
	const MAX_DEPTH = 7;
	const MAX_CIRCLES = 4 ** MAX_DEPTH;
	let total_complete = 0;
</script>

<script lang="ts">
	export let x: number;
	export let y: number;
	export let r: number;
	export let depth: number;

	let has_split = false;
	let has_animated = false;

	function split() {
		if (has_split) return;
		has_split = true;
		if (depth === MAX_DEPTH) {
			total_complete += 4;
			if (total_complete === MAX_CIRCLES) {
				console.log("done");
			}
		}
	}
</script>

<g style:--r="{r}px">
	{#if !has_split}
		<circle cx={x} cy={y} {r} on:mouseover={split} />
	{/if}
	{#if has_split && (!has_animated || depth === MAX_DEPTH)}
		<circle class="ball" cx={x} cy={y} {r} on:animationend={() => (has_animated = true)} />
		<circle class="ball" cx={x} cy={y} {r} />
		<circle class="ball" cx={x} cy={y} {r} />
		<circle class="ball" cx={x} cy={y} {r} />
	{/if}
	{#if has_animated && depth < MAX_DEPTH}
		{@const new_r = r / 2}
		<svelte:self x={x + new_r} y={y + new_r} r={new_r} depth={depth + 1} />
		<svelte:self x={x + new_r} y={y - new_r} r={new_r} depth={depth + 1} />
		<svelte:self x={x - new_r} y={y + new_r} r={new_r} depth={depth + 1} />
		<svelte:self x={x - new_r} y={y - new_r} r={new_r} depth={depth + 1} />
	{/if}
</g>

<style lang="scss">
	.ball {
		animation: split 0.2s ease-in-out forwards;
		--shift: calc(var(--r) / 2);
		--negative-shift: calc(var(--shift) * -1);
	}
	.ball:nth-child(1) {
		--x: var(--negative-shift);
		--y: var(--negative-shift);
	}
	.ball:nth-child(2) {
		--x: var(--shift);
		--y: var(--negative-shift);
	}
	.ball:nth-child(3) {
		--x: var(--negative-shift);
		--y: var(--shift);
	}
	.ball:nth-child(4) {
		--x: var(--shift);
		--y: var(--shift);
	}
	@keyframes split {
		0% {
			opacity: 0.5;
			r: var(--r);
		}
		100% {
			opacity: 1;
			r: calc(var(--r) / 2);
			transform: translate(var(--x), var(--y));
		}
	}
</style>
