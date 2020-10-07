<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value;

  $: if (value) {
    dispatch('message', {
      payload: value,
    });
  }
</script>
<style>
  .passwordInput {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    border: none;

    width: 100%;

    pointer-events: all;
    user-select: auto;
  }
  /* .passwordInput::placeholder {
    text-transform: capitalize;
  } */
  .passwordInput:focus {
    outline: none;
  }
</style>

<input class="passwordInput" type="password" {...$$props} {...$$restProps} bind:value={value} />
