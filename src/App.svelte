<script lang="ts">
	import Menu from "./lib/Menu.svelte";
	import Card from "./lib/Card.svelte";
	import Imerge from "./lib/Imerge.svelte";
	import Upload from "./lib/Upload.svelte";
	import ImageUrl from "./lib/ImageUrl.svelte";
	import Modal from "./lib/Modal.svelte";
	import ImageEditor from "./lib/ImageEditor.svelte";
	import Gallery from "./lib/Gallery.svelte";

	let images: HTMLImageElement[] = [];

	let modal = false;

	function onUpload(e: CustomEvent<{ image: HTMLImageElement }>) {
		images.push(e.detail.image);
		images = images;
		console.log(images);
	}

	function imageProcessed(e: CustomEvent<{ crop: Crop }>) {
		images.shift();
		images = images;
	}
</script>

<main>
	<section class="display">
		<Imerge />
	</section>
	<Menu>
		<!-- {#if DB == null}
			<div class="card no-db">
				Failed to open local image database. Uploaded images and crop changes will not be
				saved.
			</div>
		{/if} -->
		<Gallery />
		<Card>
			<Upload on:upload={onUpload} />
		</Card>
		<Card>
			<ImageUrl />
		</Card>
		<Card>
			Inspiration
			<ul>
				<li><a href="https://www.koalastothemax.com/">Concept</a></li>
				<li><a href="https://bennettfeely.com/clippy/">Layout</a></li>
			</ul>
		</Card>
		{#each Array(29) as _, i}
			<Card>Dummy card {i}</Card>
		{/each}
	</Menu>
</main>

{#if images.length > 0}
	{#key images[0]}
		<ImageEditor image={images[0]} on:complete={imageProcessed} />
	{/key}
{/if}

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 60vh 1fr;
	}
	.display {
		padding: var(--gap) var(--gap) 0;
	}
	// .no-db {
	// 	background-color: var(--red);
	// 	text-align: center;
	// 	color: white;
	// }
	@media (orientation: landscape) {
		main {
			grid-template-columns: 1fr 40rem;
			grid-template-rows: 1fr;
			min-height: 100vh;
		}
		.display {
			position: sticky;
			top: 0;
			max-height: 100vh;
			padding: var(--gap) 0 var(--gap);
		}
	}
</style>
