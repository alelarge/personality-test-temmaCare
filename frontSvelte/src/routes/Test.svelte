<script>
    import Question from '../components/Question/Question.svelte';
    export let testId;

    async function getTestQuestions(url) {
        const res = await fetch(`http://localhost:8080/tests/${testId}/questions?projection=with_responses`);

      if (res.ok) {
        return await res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    }

    let data = getTestQuestions(testId);
    let answers = {};
    let currentQuestionId = 0;
</script>

{#await data then data}
    <Question data={data._embedded.questions[currentQuestionId]} />
{/await}