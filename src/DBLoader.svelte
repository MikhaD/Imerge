<script lang="ts">
	import App from "./App.svelte";
	import Loading from "./lib/Loading.svelte";
	import { fade } from "svelte/transition";

	function openConnection(db: string, store: string, version: number): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(db, version);

			request.onerror = () => reject(request.error);

			request.onsuccess = () => resolve(request.result);

			request.onupgradeneeded = () => {
				const db = request.result;
				db.createObjectStore(store, { keyPath: "id", autoIncrement: true });
			};
		});
	}
</script>

{#await openConnection("imerge-images", "images", 1)}
	<div out:fade>
		<Loading />
	</div>
{:then DB}
	<App {DB} />
{:catch error}
	<App />
{/await}

<style>
	div {
		position: fixed;
		inset: 0;
		margin: auto;
		height: 90vmin;
		width: fit-content;
	}
</style>
