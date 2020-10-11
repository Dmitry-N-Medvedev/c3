<script>
	import {
		stores,
	} from '@sapper/app';
	import Nav from '../components/Nav.svelte';
	import Basement from '../components/Basement.svelte';
	import {
		onMount,
		onDestroy,
	} from 'svelte';
	import {
		AuthAdapter,
	} from '../../client/AuthAdapter.mjs';

	const {
		session,
	} = stores();

	let authAdapter = null;

	const handleWindowUnload = () => {
    window.removeEventListener('unload', handleWindowUnload);

		if (authAdapter) {
			authAdapter.destroy();

			authAdapter = null;
		}
	};

	onMount(async () => {
		window.addEventListener('unload', handleWindowUnload);

		authAdapter = new AuthAdapter(session);
	});

	onDestroy(() => {
		if (authAdapter) {
			authAdapter.destroy();

			authAdapter = null;
		}
	});
</script>

<main id="main">
	{#if $session.user}
		<Nav />
	{/if}
	<slot></slot>
	{#if $session.user}
		<Basement />
	{/if}
</main>