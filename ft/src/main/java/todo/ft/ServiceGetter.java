package todo.ft;

import java.util.Iterator;
import java.util.ServiceLoader;

class ServiceGetter {
    static final ServicesProvider SERVICES;

    static {
        Iterator<ServicesProvider> loaded = ServiceLoader.load(ServicesProvider.class).iterator();
        ServicesProvider impl = loaded.next();
        if (Boolean.getBoolean("external_services")) {
            while (!Services.class.equals(impl.getClass())) {
                impl = loaded.next();
            }
        }
        SERVICES = impl;
    }
}
