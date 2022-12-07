<script>
    import { useNavigate } from "svelte-navigator";
    import Question from '../components/Question/Question.svelte';
    import { testResult } from "../stores";
    export let testId;

    const navigate = useNavigate();
    let answers = {};
    let currentQuestionNumber = 1;

    async function getTestQuestions(url) {
        const res = await fetch(`http://localhost:8080/tests/${testId}/questions?projection=with_responses`);

      if (res.ok) {
        return await res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    }

    async function postAnswers() {
      const rawResponse = await fetch(`http://localhost:8080/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      });
      
      const res = await rawResponse.json();
      testResult.set(res.result);

      navigate(`/test/${testId}/result`);
    }

    const handleClickAnswer = (responseLetter) => {
        answers[currentQuestionNumber] = responseLetter;
        
    }

    const handleClickSubmit = (questionCount) => {
      if (currentQuestionNumber < questionCount) {
        currentQuestionNumber += 1;
      } else {
        postAnswers();
      }
    }

    const handleClickPrevious = (questionCount) => {
      currentQuestionNumber -= 1;
    }

    let data = getTestQuestions(testId);
</script>

{#await data then data}
  {#each data._embedded.questions as question (question.number)}
    <Question 
      question={question}
      questionCount={data._embedded.questions.length}
      isHidden={question.number != currentQuestionNumber}
      handleClickAnswer={handleClickAnswer} 
      handleClickSubmit={handleClickSubmit}
      handleClickPrevious={handleClickPrevious}
    />
  {/each}
{/await}