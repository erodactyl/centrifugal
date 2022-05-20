<script>
  const reset = () => {
    localStorage.clear();
    location.reload();
  };
</script>

<p>
  Centrifugal is a completely decentralized service that's constantly evolving.
  It saves data inside your browser. The format of the data might change from
  time to time. If you are experiencing issues please
  <button on:click={reset}>Clear local storage</button>
</p>

<style>
  button {
    margin-left: 10px;
  }
</style>
