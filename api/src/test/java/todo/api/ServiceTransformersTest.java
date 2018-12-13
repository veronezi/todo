package todo.api;

import lombok.val;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.junit.Assert;
import org.junit.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ServiceTransformersTest {

    @Test
    public void getTodoToDtoTest() {
        val entity = new EntityTodo();
        entity.id = "aaa";
        entity.setText("buy milk");
        val dto = new ServiceTransformers().getTodoToDto().apply(entity);
        Assert.assertEquals(dto.getText(), "buy milk");
        Assert.assertEquals(dto.getId(), "aaa");
    }

    @Test
    public void getTodoToEntityTest() throws IllegalAccessException {
        val service = new ServiceTransformers();
        val token = mock(JsonWebToken.class);
        when(token.getName()).thenReturn("bob");
        FieldUtils.writeField(service, "callerPrincipal", token, true);
        val dto = new DtoTodo();
        dto.setId("bbb");
        dto.setText("buy sugar");
        val entity = service.getTodoToEntity().apply(dto);
        Assert.assertEquals(entity.getText(), "buy sugar");
        Assert.assertEquals(entity.getId(), "bbb");
        Assert.assertEquals(entity.getUsername(), "bob");
    }

}
