package todo.api;

import lombok.val;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class ApiTodoTest {

    @Test
    public void getTodos() throws IllegalAccessException {
        val api = new ApiTodo();
        val ds = mock(ServiceDatasource.class);
        FieldUtils.writeField(api, "ds", ds, true);
        FieldUtils.writeField(api, "transformers", new ServiceTransformers(), true);
        val result = new ArrayList<EntityTodo>();
        val todo = new EntityTodo();
        todo.setText("buy cheese");
        result.add(todo);
        when(ds.getAll(EntityTodo.class)).thenReturn(result);
        Assert.assertArrayEquals(
                api.getTodos().stream().map(DtoTodo::getText).toArray(),
                result.stream().map(EntityTodo::getText).toArray()
        );
        verify(ds, times(1)).getAll(EntityTodo.class);
    }

    @Test
    public void createTodo() throws IllegalAccessException {
        val api = new ApiTodo();
        val transformer = new ServiceTransformers();
        val token = mock(JsonWebToken.class);
        FieldUtils.writeField(transformer, "callerPrincipal", token, true);
        when(token.getName()).thenReturn("bob");
        val ds = mock(ServiceDatasource.class);
        FieldUtils.writeField(api, "ds", ds, true);
        FieldUtils.writeField(api, "transformers", transformer, true);
        when(ds.add(any(EntityTodo.class))).thenAnswer(i -> i.getArguments()[0]);
        val dto = new DtoTodo();
        dto.setText("buy apples");
        assertEquals(dto, api.createTodo(dto));
        val argsCaptor = ArgumentCaptor.forClass(EntityTodo.class);
        verify(ds, times(1)).add(argsCaptor.capture());
        val captured = argsCaptor.getAllValues();
        assertEquals(dto.getText(), captured.get(0).getText());
    }
}
