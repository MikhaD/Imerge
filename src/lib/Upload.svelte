<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import FileIcon from "./FileIcon.svelte";

	let upload: HTMLInputElement;
	let upload_progress = 0;
	let dragover = false;
	let upload_state: "ready" | "uploading" | "success" | "failed" = "ready";

	$: if (upload_state !== "ready" && upload_state !== "uploading") {
		setTimeout(() => {
			upload_state = "ready";
		}, 3000);
	}

	const dispatch = createEventDispatcher();

	class ProgressIncrementor {
		/** The number of processing steps that occur per file */
		private static readonly STEPS_PER_FILE = 3;
		private progress: number;
		private increment_by: number;
		constructor(file_count: number) {
			this.increment_by = 100 / (file_count * ProgressIncrementor.STEPS_PER_FILE);
			this.progress = 0;

			upload_progress = 0;
		}
		increment(value: number = 1) {
			this.progress += this.increment_by * value;
			upload_progress = this.progress;
			return this.progress;
		}
	}

	function processFiles(files: FileList) {
		upload_state = "uploading";
		const prink = new ProgressIncrementor(files.length);

		for (const file of files) {
			prink.increment();
			const reader = new FileReader();
			reader.onload = function () {
				prink.increment();
				const img = new Image();
				img.onload = function () {
					prink.increment();
					dispatch("upload", { image: img });
				};
				img.onerror = function () {
					prink.increment();
					upload_state = "failed";
				};
				img.src = reader.result as string;
			};
			reader.onerror = function () {
				prink.increment(2);
				upload_state = "failed";
			};
			reader.readAsDataURL(file);
			// break;
		}
		upload_state = "success";
	}

	function onFileDrop(e: DragEvent) {
		dragover = false;
		if (e.dataTransfer?.files?.length > 0) {
			processFiles(e.dataTransfer.files);
		}
	}

	function checkUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files.length === 0) return;
		processFiles(input.files);
	}
</script>

<label
	class="upload"
	class:drag-over={dragover}
	on:dragover|preventDefault={() => (dragover = true)}
	on:dragleave={() => (dragover = false)}
	on:drop|preventDefault={onFileDrop}
>
	<input type="file" hidden on:change={checkUpload} bind:this={upload} multiple />
	<h2>Use your own image</h2>
	<div class="icons">
		<FileIcon color="var(--blue)" extension="png" />
		<FileIcon color="var(--green)" extension="jpg" />
		<FileIcon color="var(--yellow)" extension="svg" />
	</div>
	<div>Click or drop your own image here</div>
	{#if upload_state === "uploading"}
		<div class="uploading state-card">
			<h2>Processing Images</h2>
			<progress max="100" value={upload_progress} />
		</div>
	{:else if upload_state === "success"}
		<div class="success state-card">
			<h2>Success</h2>
			<div>Custom images can be found at the end of the gallery above</div>
		</div>
	{:else if upload_state === "failed"}
		<div class="failed state-card">
			<h2>Image upload failed</h2>
			<div>Only .png and .jpg image files are supported</div>
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: block;
		padding: 1rem;
		position: relative;
		border: dashed 0.25rem var(--bg-01);
		border-radius: 0.5rem;
		box-shadow: 0 0 0.5rem 0 inset #0004;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		isolation: isolate;
		--outline: var(--bg-01); // this sets the outline color for the file icons

		&.drag-over {
			--outline: var(--bg-00);
			&::before {
				content: "";
				position: absolute;
				inset: 0;
				z-index: -1;
				background-color: var(--blue);
				opacity: 0.2;
			}
		}
	}
	h2 {
		margin-bottom: 1rem;
	}
	.icons {
		height: 5rem;
	}
	.state-card {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		text-align: center;
	}
	progress {
		width: 20rem;
	}
	.uploading {
		background-color: var(--blue);
	}
	.success {
		background-color: var(--green);
	}
	.failed {
		background-color: var(--red);
	}
</style>
