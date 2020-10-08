<script>
  import {
    onMount,
  } from 'svelte';
  import * as firebase from 'firebase/app';
  import firebaseConfig from '../../configs/firebaseConfig.mjs';

  let orders = [];

  onMount(async () => {
    const ordersResponse = await fetch('/orders', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ op: 'get:orders' }),
    });

    orders = await ordersResponse.json();
  });
</script>

<style>
  #orders {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    background-color: var(--auth-form-background-color);
    filter: drop-shadow(var(--filter-drop-shadow));
    border-radius: var(--control-border-radius);

    width: 75vw;
    height: 100vh;

    pointer-events: all;
  }

  #orders > div:not(:last-of-type) {
    border-bottom: 3px solid black;
  }

  .row,
  .row > div,
  .caption-row,
  .caption-row > div {
    display: flex;
    width: 100%;
  }

  .row > div,
  .caption-row > div {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 0.25vh;
    margin-bottom: 0.25vh;

    height: 5vh;
  }

  .row > div {
    font-size: max(0.75vw, 0.75vh);
    color: black;
  }

  .caption-row > div {
    text-transform: capitalize;
    font-weight: 600;
    font-size: max(1vw, 1vh);
    color: black;
  }
</style>

<article id="orders">
  <div class="caption-row">
    <div class="caption-title">title</div>
    <div class="caption-bookingDate">booking date</div>
    <div class="caption-address">address</div>
    <div class="caption-customer">customer</div>
  </div>
  {#each orders as {id, title, bookingDate, address, customer}}
    <div class="row" {id}>
      <div class="order-title">{title}</div>
      <div class="order-bookingDate">{bookingDate}</div>
      <div class="order-address">{address}</div>
      <div class="order-customer">{customer}</div>
    </div>
  {/each}
</article>