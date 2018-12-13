package todo.api;

public class ExceptionApplication extends RuntimeException {
    public ExceptionApplication(String message) {
        super(message);
    }
}
