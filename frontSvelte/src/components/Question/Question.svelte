<script>
    export let question;
    export let questionCount;
    export let handleClickAnswer;
    export let handleClickSubmit;
    export let handleClickPrevious;
    export let isHidden;

    let hasClickAnswer = false;
</script>

<div class="container {isHidden ? 'visually-hidden' : ''}">
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{question.questionText}</h5>
                    <ul>
                    {#each question.responses as response (response.letter)}
                        <li>
                            <input 
                                on:click={() => { hasClickAnswer = true; handleClickAnswer(response.letter); }} 
                                class="form-check-input" 
                                type="radio" 
                                name={`response-question-${question.number}`}
                                id={`response-${question.number}-${response.letter}`}
                            >
                            <label class="form-check-label" for={`response-${question.number}-${response.letter}`}>
                                {response.letter}: {response.responseText}
                            </label>
                        </li>
                    {/each}
                    </ul>
                    <a 
                        href="#" 
                        class="btn btn-primary {question.number == 1 ? 'visually-hidden' : ''}"
                        on:click={ () => { handleClickPrevious() } }
                    >
                        Previous
                    </a>
                    <a 
                        href="#"
                        class="btn btn-primary {!hasClickAnswer ? 'disabled' : ''}"
                        on:click={ () => { handleClickSubmit(questionCount)} }
                    >
                        {question.number == questionCount ? 'Submit Test' : 'Submit' }
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    li {
        list-style: none;
    }
</style>