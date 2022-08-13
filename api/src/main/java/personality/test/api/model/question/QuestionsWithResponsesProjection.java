package personality.test.api.model.question;

import org.springframework.data.rest.core.config.Projection;
import personality.test.api.model.response.Response;
import personality.test.api.model.test.Test;

import java.util.List;

@Projection(
    name = "with_responses",
    types = { Question.class }
)
public interface QuestionsWithResponsesProjection {
    String getNumber();
    String getQuestionText();
    Test getTest();
    List<Response> getResponses();
}
