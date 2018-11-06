package todo.ft;

public interface ServicesProvider {
    String getApiHost();
    Integer getApiPort();

    String getUiHost();
    Integer getUiPort();

    boolean isHeadless();
    boolean isOnDocker();
}
