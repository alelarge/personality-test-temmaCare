<script>
    import Header from '../components/Header/Header.svelte';
    import TestItem from '../components/TestItem/TestItem.svelte';

    export let data;
</script>


<div>
    <Header />
    <section>
        {#await data then data}
            {#each data._embedded.tests as test (test.id)}
                <TestItem test={test} />
            {/each}
        {/await}
    </section>
</div>