<script>
    export let data;
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{data.questionText}</h5>
                    <ul>
                    {#each data.responses as response (response.letter)}
                        <li>
                            <input class="form-check-input" type="radio" name="response" id={`response-${response.letter}`}>
                            <label class="form-check-label" for={`response-${response.letter}`}>
                                {response.letter}: {response.responseText}
                            </label>
                        </li>
                    {/each}
                    </ul>
                    <a href="#" class="btn btn-primary">Previous</a>
                    <a href="#" class="btn btn-primary">Submit</a>
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