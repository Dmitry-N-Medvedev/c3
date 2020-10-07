<script context="module">
	export async function preload(page, session) {
		const {
			user,
		} = session;

		return {
			user,
		};
	}
</script>

<script>
	import AuthScreen from "../components/AuthScreen/AuthScreen.svelte";
	import OrdersScreen from '../components/OrdersScreen/OrdersScreen.svelte';

	export let user;
</script>

<style>
</style>

<svelte:head>
	<title>c3</title>
</svelte:head>

{#if user === false}
	<AuthScreen />
{:else}
	<OrdersScreen />
{/if}
