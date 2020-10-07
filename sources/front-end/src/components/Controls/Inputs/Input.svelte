<script>
  import { createEventDispatcher } from 'svelte';
  import InputEmail from './Email.svelte';
  import InputPassword from './Password.svelte';
  import InputSubmitButton from './Submit.svelte';
  import {
    generateComponentId,
  } from '../../helpers/generateComponentId.mjs';

  const dispatch = createEventDispatcher();
  const components = {
    email: InputEmail,
    password: InputPassword,
    submit: InputSubmitButton,
  };
  const handleInputMessage = (event) => {
    dispatch('message', event.detail);
  };
</script>

<svelte:component
  this={components[$$restProps['type']]}
  id={generateComponentId({ keyLength: 5 })}
  {...$$props}
  {...$$restProps}
  on:message={handleInputMessage}
/>
