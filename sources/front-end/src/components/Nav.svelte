<script>
  import {
    AuthServiceMessages,
  } from '../../services/constants/AuthServiceMessages.mjs';
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import Input from './Controls/Inputs/Input.svelte';

  const handleLogout = async () => {
    if (window) {
      window.postMessage(AuthServiceMessages.signOut);
    }
  };

  const handleWindowMessage = ({ data }) => {
    console.debug('Nav.svelte:handleWindowMessage', data);
  };

  onMount(() => {
    window.addEventListener('message', handleWindowMessage);
  });

  onDestroy(() => {
    if (window) {
      window.removeEventListener('message', handleWindowMessage);
    }
  });
</script>

<style>
  #top-menu {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    align-items: center;
    width: 75%;

    margin: 0;
    padding: 1vh 0;
  }

  #logout-form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>

<nav id="top-menu">
  <form id="logout-form" on:submit|preventDefault|stopPropagation={handleLogout}>
    <Input
      type="submit"
      value="logout"
    />
  </form>
</nav>