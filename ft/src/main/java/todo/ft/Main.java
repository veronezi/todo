package todo.ft;

public class Main {
    public static void main(String[] args) {
        cucumber.api.cli.Main.main(new String[]{
                "--plugin",
                "pretty",
                "--snippets",
                "UNDERSCORE",
                "classpath:todo/ft",
                "--glue",
                "classpath:todo/ft"
        });
    }
}
