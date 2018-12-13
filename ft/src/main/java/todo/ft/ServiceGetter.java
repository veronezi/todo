package todo.ft;

import lombok.val;
import lombok.var;

import java.util.ServiceLoader;

class ServiceGetter {
    static final ServicesProvider SERVICES;

    static {
        val loaded = ServiceLoader.load(ServicesProvider.class).iterator();
        var impl = loaded.next();
        if (Boolean.getBoolean("external_services")) {
            while (!Services.class.equals(impl.getClass())) {
                impl = loaded.next();
            }
        }
        SERVICES = impl;
    }
}
