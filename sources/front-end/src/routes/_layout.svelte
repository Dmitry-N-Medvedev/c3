<script>
	import * as firebase from 'firebase/app';
	import 'firebase/auth';
	import firebaseConfig from '../configs/firebaseConfig.mjs';
	import Cookies from 'js-cookie';

	import {
		onMount,
	} from 'svelte';
	import {
		stores,
	} from '@sapper/app';

	const { session } = stores();

	onMount(async () => {
		firebase.initializeApp(firebaseConfig);

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
	<slot></slot>
</main>