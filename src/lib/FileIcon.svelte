<script context="module">
	const UUID = {
		count: 0,
		next: () => `${Math.random().toString(36).slice(2)}-${UUID.count++}`,
	};
</script>

<script lang="ts">
	export let color: string = "#000";
	export let extension: string = "";

	const id = UUID.next();
</script>

<svg viewBox="0 0 50 50" stroke-linejoin="round">
	<path class="outline" d="M6 20V2h29l10 10v8m0 20v8H6v-8" fill="none" stroke-width="2" />
	<path mask="url(#{id})" d="M5 20H46V40H5z" fill={color} />
	<defs>
		<mask {id}>
			<rect width="100%" height="100%" fill="#fff" />
			<text text-anchor="middle">{extension}</text>
		</mask>
	</defs>
</svg>

<style lang="scss">
	svg {
		height: 100%;
	}
	.outline {
		stroke: var(--outline, silver);
	}
	text {
		font-family: "Roboto", Arial, sans-serif;
		transform: translate(51%, 35px);
		font-weight: 900;
		text-transform: uppercase;
		font-size: 1.4rem;
	}
</style>
