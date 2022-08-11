package personality.test.api.model.question;

import lombok.Getter;
import personality.test.api.model.response.Response;
import personality.test.api.model.test.Test;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @Getter
    private Integer number;

    @Column(nullable = false)
    @Getter
    private String questionText;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    @Getter
    private Test test;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @OrderBy("letter")
    @Getter
    private List<Response> responses;
}
