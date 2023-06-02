<input type="url" placeholder="Use image from URL" pattern="https?:\/\/.*$" required />

<style lang="scss">
	input {
		width: 100%;
		padding: 0.6rem;
		border-radius: 0.25rem;
		border: solid 0.1rem var(--page-bg-color);
		box-shadow: 0 0 0.3rem 0 inset #0004;
		outline: none;
		&:focus {
			&:invalid {
				border-color: var(--red);
			}
		}
		&:valid {
			border-color: var(--green);
		}
	}
</style>
