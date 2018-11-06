package todo.api;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_todo")
public class EntityTodo extends EntityBase {

    @Column(name = "txt")
    private String text;

    private boolean done;

}
