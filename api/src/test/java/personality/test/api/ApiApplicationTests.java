package personality.test.api;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(
		webEnvironment = SpringBootTest.WebEnvironment.MOCK,
		classes = ApiApplication.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class ApiApplicationTests {

	@Autowired
	private MockMvc mvc;

	@Test
	void fetchTests() throws Exception {
		mvc.perform(get("/tests")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json("{\"_embedded\": {\"tests\": [{\"title\": \"Are you an introvert or an extrovert?\"}]}}"))
				.andDo(MockMvcResultHandlers.print());
	}

}
