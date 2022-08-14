package personality.test.api.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component("testCalculator")
public class TestCalculator {
    public static class Answers {
        public Map<String, String> answers = new HashMap<>();
    }

    @AllArgsConstructor
    public static class Result {
        public String result;
    }

    public Result calculate(Long testId, Answers answers) {
        Map<String, Integer> freqMap = new HashMap<>();
        String mostFrequent = "";
        int mostFrequentCount = 0;
        for (String letter: answers.answers.values()) {
            Integer count = freqMap.get(letter);
            freqMap.put(letter, count == null ? 1 : count + 1);
            if (freqMap.get(letter) > mostFrequentCount) {
                mostFrequent = letter;
                mostFrequentCount = freqMap.get(letter);
            }
        }

        switch (mostFrequent) {
            case "A" -> { return new Result("Introvert"); }
            case "B" -> { return new Result("Mostly introvert"); }
            case "C" -> { return new Result("Mostly extravert"); }
            case "D" -> { return new Result("Extravert"); }
        }

        return new Result("Unknown");
    }
}
