<script lang="ts">
	import GalleryImage from "./GalleryImage.svelte";

	let images = 10;

	let gallery: HTMLDivElement;

	function scrollGallery(amount: number) {
		gallery.scrollBy({
			left: amount,
			behavior: "smooth",
		});
	}
</script>

<section>
	<svg viewBox="0 0 10 10" class="scroll" data-direction="left">
		<path d="M7 0l-5 5l5 5z" on:click={() => scrollGallery(-140)} />
	</svg>
	<div
		class="gallery"
		bind:this={gallery}
		on:wheel|preventDefault={(e) => scrollGallery(e.deltaY * 1.5)}
	>
		{#each Array(images) as _}
			<GalleryImage />
		{/each}
	</div>
	<svg viewBox="0 0 10 10" class="scroll" data-direction="right">
		<path d="M3 0l5 5l-5 5z" on:click={() => scrollGallery(140)} />
	</svg>
</section>

<style lang="scss">
	section {
		--nav-width: 5rem;
		position: relative;
		&::before,
		&:after {
			content: "";
			z-index: 1;
			width: var(--nav-width);
			position: absolute;
			background-image: linear-gradient(var(--angle), var(--bg-01), transparent);
		}
		&::before {
			--angle: 90deg;
			inset: 0 auto 0 0;
		}
		&::after {
			--angle: -90deg;
			inset: 0 0 0 auto;
		}
		&:hover .scroll {
			opacity: 1;
		}
	}
	.scroll {
		position: absolute;
		width: var(--nav-width);
		z-index: 2;
		margin-block: auto;
		overflow: visible;
		fill: var(--bg-00);
		opacity: 0;
		transition: opacity 0.25s ease-in-out;
		path {
			transition: scale 0.1s ease-in-out;
			transform-origin: center;
			cursor: pointer;
		}
		path:hover {
			scale: 1.2;
		}
	}
	[data-direction="left"] {
		inset: 0 auto 0 0;
	}
	[data-direction="right"] {
		inset: 0 0 0 auto;
	}
	.gallery {
		--height: 13rem;
		display: grid;
		position: relative;
		height: var(--height);
		gap: 1rem;
		grid-template-rows: 100%;
		grid-auto-columns: var(--height);
		grid-auto-flow: column;
		padding-inline: var(--nav-width);
		overflow-x: scroll;
		isolation: isolate;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
