package personality.test.api.model.test;

import org.springframework.data.rest.core.config.Projection;
import personality.test.api.model.question.Question;

import java.util.List;

@Projection(
    name = "with_questions",
    types = { Test.class }
)
public interface TestProjection {
    String getTitle();
    List<Question> getQuestions();
}
