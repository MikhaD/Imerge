<aside>
	<div class="card" />
	<slot />
</aside>

<style lang="scss">
	.card {
		height: 4rem;
		background-color: var(--fg-00);
	}
	aside {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: var(--gap);
	}
</style>
