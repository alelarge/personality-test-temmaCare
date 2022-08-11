package personality.test.api.model.test;

import lombok.Getter;
import personality.test.api.model.question.Question;

import javax.persistence.*;
import java.util.List;

@Entity
public class Test {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter
    private Long id;

    @Column(nullable = false)
    @Getter
    private String title;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    @OrderBy("number")
    @Getter
    private List<Question> questions;
}
