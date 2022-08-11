package personality.test.api.model.response;

import lombok.Getter;
import personality.test.api.model.question.Question;

import javax.persistence.*;

@Entity
public class Response {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Getter
    private Long id;

    @Column(nullable = false)
    @Getter
    private String letter;

    @Column(nullable = false)
    @Getter
    private String responseText;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @Getter
    private Question question;

}
