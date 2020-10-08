<script>
  import * as firebase from 'firebase/app';
  import {
    stores,
  } from '@sapper/app';
  import Input from './Controls/Inputs/Input.svelte';

  const { session } = stores();

  const handleLogout = async () => {
    await firebase.auth().signOut();

    $session.user = false;
  };
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