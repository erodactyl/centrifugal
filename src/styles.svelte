<style>
  :global(:root) {
    --primary: #06bcc1;
    --primary-dark: #05999e;
    --background: #12263a;
    --background-light: #26527d;
    --accent: #c5d8d1;
    --accent-light: #dae7e2;
  }

  :global(button),
  :global(button:focus) {
    margin: 0;
    outline: none;
    border: none;
    background-color: var(--primary);
    cursor: pointer;
    color: #fff;
    padding: 8px 20px;
    border-radius: 5px;
  }

  :global(button:hover) {
    background-color: var(--primary-dark);
  }

  :global(.alias) {
    font-size: 18px;
    font-weight: 800;
  }

  :global(input:focus),
  :global(textarea:focus),
  :global(select:focus) {
    outline: none;
  }

  :global(input) {
    border-radius: 5px;
    padding: 15px;
  }

  :global(input:focus) {
    border: 1px solid var(--primary);
  }
</style>
