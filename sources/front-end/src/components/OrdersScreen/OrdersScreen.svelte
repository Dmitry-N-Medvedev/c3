<!-- <script context="module">
  export async function preload(page, session) {
    console.log('preload');

    let orders = [];

    const response = await this.fetch('/orders', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    console.debug('response', response);

    orders = await response.json();

    console.debug('fetch orders', orders);

    return { orders };
  };
</script> -->

<script>
  import {
    onMount,
  } from 'svelte';

  let orders;

  onMount(async () => {
    const response = await fetch('/orders', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    orders = await response.json();
    
    console.debug('orders', orders);
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

    margin: 0;
    padding: 1vh 1vw;

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
  {#if orders}
    {#each orders as {title, bookingDate, address, customer}}
      <div class="row">
        <div class="order-title">{title}</div>
        <div class="order-bookingDate">{bookingDate}</div>
        <div class="order-address">{address}</div>
        <div class="order-customer">{customer}</div>
      </div>
    {/each}
  {/if}
</article>