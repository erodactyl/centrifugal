<script lang="ts">
  export let alias: string;
</script>

<img
  src={`https://avatars.dicebear.com/api/bottts/${alias}.svg`}
  alt={`Avatar of ${alias}`}
/>

<style>
  img {
    height: 40px;
    width: 40px;
    border: 1px solid gray;
    border-radius: 100%;
  }
</style>
