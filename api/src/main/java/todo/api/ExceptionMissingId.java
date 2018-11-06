package todo.api;

public class ExceptionMissingId extends ExceptionApplication {

    public ExceptionMissingId(EntityBase entity) {
        super("Missing Id: " + entity);
    }

}
