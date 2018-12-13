package todo.api;

import lombok.Getter;
import lombok.val;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.function.Function;

@ApplicationScoped
@Getter
public class ServiceTransformers {

    @Inject
    private JsonWebToken callerPrincipal;

    private final Function<EntityTodo, DtoTodo> todoToDto = entity -> {
        val dto = new DtoTodo();
        dto.setId(entity.getId());
        dto.setText(entity.getText());
        dto.setDone(entity.isDone());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    };

    private final Function<DtoTodo, EntityTodo> todoToEntity = dto -> {
        val entity = new EntityTodo();
        entity.id = dto.getId();
        entity.setText(dto.getText());
        entity.setDone(dto.isDone());
        entity.createdAt = dto.getCreatedAt();
        entity.username = callerPrincipal.getName();
        return entity;
    };

}
