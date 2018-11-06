package todo.api;

import javax.persistence.PrePersist;
import java.time.Instant;
import java.util.UUID;

public class ListenerEntityBase {

    @PrePersist
    public void prepareId(final EntityBase entity) {
        if (entity.username == null) {
            throw new ExceptionApplication("username not set");
        }
        entity.id = UUID.randomUUID().toString();
        entity.createdAt = Instant.now().toEpochMilli();
    }

}
