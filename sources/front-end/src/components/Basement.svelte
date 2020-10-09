<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    userInfoStore,
  } from '../stores/userInfoStore.mjs';

  let unsubscribeFromUserInfoStore;
  let userName;

  onMount(() => {
    unsubscribeFromUserInfoStore = userInfoStore.subscribe(({ name = null }) => {
      userName = name;
    });
  });

  onDestroy(() => {
    if (unsubscribeFromUserInfoStore) {
      unsubscribeFromUserInfoStore();
    }
  });

</script>

<style>
  #basement {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    align-items: center;
    width: 75%;

    margin: 0;
    padding: 1vh 0;
  }

  #basement-user-info-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  #basement-user-info-container > div {
    display: flex;
    flex: 1 0 auto;
  }
</style>

<div id="basement">
  <div id="basement-user-info-container">
    <div>{userName}</div>
  </div>
</div>