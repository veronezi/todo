package todo.api;

import lombok.Data;

@Data
public class DtoTodo {

    private String id;

    private String text;

    private boolean done;

    private long createdAt;

}
