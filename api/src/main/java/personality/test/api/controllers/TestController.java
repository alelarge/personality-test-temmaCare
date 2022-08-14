package personality.test.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import personality.test.api.service.TestCalculator;

@RestController()
@RequestMapping("/tests")
@CrossOrigin({ "http://localhost:3000" })
public class TestController {

    @Autowired
    private TestCalculator testCalculator;

    @PostMapping("/{testId}/submit")
    TestCalculator.Result calculateResult(
            @PathVariable Long testId,
            @RequestBody TestCalculator.Answers answers
    ) {
        return testCalculator.calculate(testId, answers);
    }
}
