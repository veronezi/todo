package todo.ft;

public class TestException extends RuntimeException {
    public TestException(String message) {
        super(message);
    }

    public TestException(Throwable cause) {
        super(cause);
    }
}
