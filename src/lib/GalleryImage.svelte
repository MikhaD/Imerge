<div class="image card" tabindex="0">
	<div class="close">×</div>
</div>

<style lang="scss">
	.image {
		--border-width: 0px;
		background-color: black;
		height: 100%;
		outline: none;
		position: relative;
		transition: scale 0.1s ease-in-out;
		border: solid var(--bg-00) var(--border-width);
		&:hover {
			--border-width: 2px;
		}
		&:focus {
			--border-width: 3px;
			scale: 1;
		}
		&:active {
			scale: 0.95;
		}
	}
	.close {
		--x-offset: calc(var(--border-width) * -1);
		background-color: var(--bg-00);
		color: var(--fg-00);
		font-size: 3rem;
		display: grid;
		place-content: center;
		width: 2rem;
		height: 2rem;
		position: absolute;
		inset: var(--x-offset) var(--x-offset) auto auto;
		border-bottom-left-radius: 50%;
		padding: 0 0 1px 1px;
		user-select: none;
		cursor: pointer;
	}
</style>
