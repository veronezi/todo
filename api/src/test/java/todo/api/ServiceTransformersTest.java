package todo.api;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.junit.Assert;
import org.junit.Test;

import javax.ejb.EJBContext;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ServiceTransformersTest {

    @Test
    public void getTodoToDtoTest() {
        EntityTodo entity = new EntityTodo();
        entity.id = "aaa";
        entity.setText("buy milk");
        DtoTodo dto = new ServiceTransformers().getTodoToDto().apply(entity);
        Assert.assertEquals(dto.getText(), "buy milk");
        Assert.assertEquals(dto.getId(), "aaa");
    }

    @Test
    public void getTodoToEntityTest() throws IllegalAccessException {
        ServiceTransformers service = new ServiceTransformers();
        JsonWebToken token = mock(JsonWebToken.class);
        when(token.getName()).thenReturn("bob");
        FieldUtils.writeField(service, "callerPrincipal", token, true);
        DtoTodo dto = new DtoTodo();
        dto.setId("bbb");
        dto.setText("buy sugar");
        EntityTodo entity = service.getTodoToEntity().apply(dto);
        Assert.assertEquals(entity.getText(), "buy sugar");
        Assert.assertEquals(entity.getId(), "bbb");
        Assert.assertEquals(entity.getUsername(), "bob");
    }

}
