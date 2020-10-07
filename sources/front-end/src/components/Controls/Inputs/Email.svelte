<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let value;

  $: if (value) {
    dispatch('message', {
      payload: value,
    })
  }
</script>
<style>
  .emailInput {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    border: none;

    width: 100%;

    pointer-events: all;
    user-select: auto;
  }
  /* .emailInput::placeholder {
    text-transform: capitalize;
  } */
  .emailInput:focus {
    outline: none;
  }
</style>

<input class="emailInput" type="email" {...$$props} {...$$restProps} bind:value={value} />
