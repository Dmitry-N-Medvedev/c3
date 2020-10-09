<script>
  import * as firebase from 'firebase/app';
  import 'firebase/auth';
  import Input from '../Controls/Inputs/Input.svelte';
  import {
    userInfoStore,
  } from '../../stores/userInfoStore.mjs';

  let disabled = false;

  const handleFieldChange = ({ key, event }) => {
    console.debug('AuthScreen:handleFieldChange', key, event);
  };

  const requestUserInfo = async (userId) => {
    try {
      const response = await fetch('/user', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          userId,
        }),
      });
      const userInfo = await response.json();

      userInfoStore.udpateUserInfo(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (event) => {
    const email = event.target?.email?.value ?? null;
    const password = event.target?.password?.value ?? null;

    disabled = email && password;

    if (disabled) {
      try {
        const authResult = await firebase.auth().signInWithEmailAndPassword(email, password);

        requestUserInfo(authResult?.user?.uid);
      } catch (error) {
        const { code, message } = error;

        console.error(code, message);
      }
    }
  };
</script>

<style>
  :root {
    --auth-form-background-color: hsl(0, 0%, 98%);
  }

  #auth-screen {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;

    flex: 1 0 auto;
  }

  #auth-form {
    display: grid;
    grid-template-columns: 0.25fr 3fr 0.25fr;
    grid-template-rows: 0.75fr 2fr 2fr 1fr 0.25fr;
    grid-template-areas:
      '. auth-form-label .'
      '. email .'
      '. password .'
      '. send-button .'
      '. . .'
    ;

    width: 30vw;
    height: 20vw;

    background-color: var(--auth-form-background-color);
    filter: drop-shadow(var(--filter-drop-shadow));
    border-radius: var(--control-border-radius);
  }

  #auth-form-label {
    grid-area: auth-form-label;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: var(--input-font-size);
    font-weight: 100;
    font-variant: small-caps;
    text-transform: lowercase;
  }

  #email,
  #password {
    padding: 2.5vh 0;
  }

  #email {
    grid-area: email;
  }

  #password {
    grid-area: password;
  }

  #send-button {
    grid-area: send-button;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<!--
  TODO:  auth-screen should be extracted to its own component
-->
<article id="auth-screen">
  <form id="auth-form" on:submit|preventDefault|stopPropagation={handleFormSubmit}>
    <label id="auth-form-label" for="auth-form">
      please authenticate
    </label>
    <div id="email" class="form-row">
      <Input
        type="email"
        name="email"
        value="coding-challenge@construyo.de"
        placeholder="your email"
        autocomplete="email"
        required
        {disabled}
        on:message={(event) => handleFieldChange({ key: 'email', event })}
      />
    </div>
    <div id="password" class="form-row">
      <Input
        type="password"
        name="password"
        value="coding-challenge@construyo.de"
        placeholder="your password"
        autocomplete="current-password"
        required
        {disabled}
        on:message={(event) => handleFieldChange({ key: 'password', event })}
      />
    </div>
    <div id="send-button" class="form-row">
      <Input
        type="submit"
        value="submit"
        {disabled}
      />
    </div>
  </form>
</article>