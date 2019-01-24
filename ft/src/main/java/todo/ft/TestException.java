package todo.ft;

public class TestException extends RuntimeException {
    public TestException(String message) {
        super(message);
    }

    public TestException(Throwable cause) {
        super(cause);
    }

    public TestException(String message, Throwable cause) {
        super(message, cause);
    }
}
