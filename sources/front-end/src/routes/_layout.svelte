<script>
	import * as firebase from 'firebase/app';
	import Cookies from 'js-cookie';
	import Nav from '../components/Nav.svelte';

	import {
		onMount,
	} from 'svelte';
	import {
		stores,
	} from '@sapper/app';

	const { session } = stores();

	onMount(async () => {
		firebase.auth().onIdTokenChanged(async (user) => {
			try {
				if (!user) {
					$session.user = false;
					Cookies.set('token', $session.user);

					return;
				}

				$session.user = await user.getIdToken();
				Cookies.set('token', $session.user);
			} catch (error) {
				$session.user = false;
				Cookies.set('token', $session.user);

				console.error(error);

				return;
			}
		});
	});
</script>

<main id="main">
	{#if $session.user}
		<Nav />
	{/if}
	<slot></slot>
</main>