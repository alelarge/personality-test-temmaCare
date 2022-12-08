<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from './components/Navbar/Navbar.svelte';
  import Home from './screens/Home/Home.svelte';
  import Test from './screens/Test/Test.svelte';
  import TestResult from './screens/TestResult/TestResult.svelte';
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

<Router>
  <Navbar data={data} />
  <Route path="/">
    <Home data={data} />
  </Route>
  <Route path="/test/:testId" let:params>
    <Test testId={params.testId} />
  </Route>
  <Route path="/test/:testId/result" let:params>
    <TestResult />
  </Route>
</Router>
