package todo.api;

import org.eclipse.microprofile.auth.LoginConfig;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/api")
@LoginConfig(authMethod = "MP-JWT")
public class Api extends Application {

}
