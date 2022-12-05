<script>
    import './TestItem.scss';

    export let test;
</script>

<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h3><span class="badge bg-secondary">Test</span></h3>
        <h5 class="card-title">{test.title}</h5>
        <button type="button" class="btn btn-primary">Pass the test</button>
    </div>
</div>