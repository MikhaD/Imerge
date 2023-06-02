<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function close() {
		dispatch("close");
	}
</script>

<div class="backdrop" on:click={close} />
<div class="modal card">
	<svg class="close" viewBox="0 0 5 5" on:click={close}>
		<path d="M.5.5L4.5 4.5M.5 4.5L4.5.5" />
	</svg>
	<div class="close" />
	<slot />
</div>

<style lang="scss">
	.close {
		position: absolute;
		height: 1.5rem;
		top: var(--gap);
		right: var(--gap);
		cursor: pointer;
		stroke: currentcolor;
	}
	.modal {
		position: fixed;
		margin: auto;
		padding-top: 3rem;
		inset: 0;
		width: 60%;
		max-width: 85rem;
		height: 60%;
		z-index: 10;
	}
	.backdrop {
		position: fixed;
		inset: 0;
		background: #0004;
	}
</style>
