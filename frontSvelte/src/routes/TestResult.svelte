<script>
    import { testResult } from '../stores.js';
    import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();

    let testResultValue;

    testResult.subscribe(value => {
		testResultValue = value;
	});
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{testResultValue}</h5>
                    <button on:click="{() => navigate('/')}" class="btn btn-primary">Return to homepage</button>
                </div>
            </div>
        </div>
    </div>
</div>