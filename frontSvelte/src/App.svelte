<script>
  import Navbar from './components/Navbar/Navbar.svelte';
  import Header from './components/Header/Header.svelte';
  import TestItem from './components/TestItem/TestItem.svelte';
  import './app.scss';

  async function getTestList() {
      const res = await fetch(`http://localhost:8080/tests`);

      if (res.ok) {
        return await res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    }

    let data = getTestList();
</script>

<main>
  <Navbar data={data} />
  <Header />
  <section>
    {#await data then data}
      {#each data._embedded.tests as test (test.id)}
        <TestItem test={test} />
      {/each}
    {/await}
  </section>

</main>