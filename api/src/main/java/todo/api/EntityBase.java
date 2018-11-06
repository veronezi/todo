package todo.api;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@EntityListeners(ListenerEntityBase.class)
public class EntityBase {

    @Id
    @Getter
    @Column(name = "id", updatable = false)
    protected String id;

    @Column(name = "created_ts")
    @Getter
    protected long createdAt;

    @Getter
    @Column(name = "username", updatable = false)
    protected String username;

}
