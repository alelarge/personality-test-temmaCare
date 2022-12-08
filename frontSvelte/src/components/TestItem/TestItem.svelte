<script>
    import { useNavigate } from "svelte-navigator";
    import './TestItem.scss';

    export let test;

    const navigate = useNavigate();
</script>

<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h3><span class="badge bg-secondary">Test n°{test.id}</span></h3>
        <h5 class="card-title">{test.title}</h5>
        <button
            type="button" 
            class="btn btn-primary" 
            on:click="{() => {navigate(`/test/${test.id}`)}}"
        >
            Pass the test
        </button>
    </div>
</div>