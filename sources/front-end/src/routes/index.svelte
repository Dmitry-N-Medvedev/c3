<script>
	import AuthScreen from "../components/AuthScreen/AuthScreen.svelte";
	import OrdersScreen from '../components/OrdersScreen/OrdersScreen.svelte';

	let isAuthenticated = false;
</script>

<style>
</style>

<svelte:head>
	<title>c3</title>
</svelte:head>

{#if isAuthenticated === true}
	<OrdersScreen />
{:else}
	<AuthScreen />
{/if}
