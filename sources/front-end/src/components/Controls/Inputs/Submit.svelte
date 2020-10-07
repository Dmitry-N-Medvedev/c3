<style>
  .submitInput {
    align-self: center;
    border: none;
    cursor: pointer;
    display: flex;
    height: 6vh;
    justify-self: center;
    pointer-events: all;
    position: relative;
    width: 10vw;

    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;

    background-color: var(--button-background-color);
    border-radius: var(--control-border-radius);
    color: var(--button-color);

    /* filter: drop-shadow(0px 0px 6px black); */
  }
  .submitInput:focus {
    outline: none;
  }
  .submitInput:active {
    box-shadow: inset 0 0 10px hsl(249deg 34% 36%);
    filter: brightness(0.95);
  }
</style>

<input class="submitInput" type="submit" {...$$props} {...$$restProps} />
