package todo.ft;

public class Services implements ServicesProvider {
    @Override
    public String getApiHost() {
        return System.getProperty("api_host", "localhost");
    }

    @Override
    public Integer getApiPort() {
        return Integer.valueOf(System.getProperty("api_port", "8080"));
    }

    @Override
    public String getUiHost() {
        return System.getProperty("ui_host", "localhost");
    }

    @Override
    public Integer getUiPort() {
        return Integer.valueOf(System.getProperty("ui_port", "80"));
    }

    @Override
    public boolean isHeadless() {
        return true;
    }
}
