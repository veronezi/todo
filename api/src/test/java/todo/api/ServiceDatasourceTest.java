package todo.api;

import lombok.val;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.junit.Assert;
import org.junit.Test;

import javax.ejb.EJBContext;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.security.Principal;
import java.text.MessageFormat;
import java.util.ArrayList;

import static org.mockito.Mockito.*;

public class ServiceDatasourceTest {

    private class MyEntity extends EntityBase {
        // no-op
    }

    @Test
    public void addTest() throws IllegalAccessException {
        val ds = new ServiceDatasource();
        val em = mock(EntityManager.class);
        val context = mock(EJBContext.class);
        val principal = mock(Principal.class);
        when(context.getCallerPrincipal()).thenReturn(principal);
        when(principal.getName()).thenReturn("jdoe");
        FieldUtils.writeField(ds, "context", context, true);
        FieldUtils.writeField(ds, "em", em, true);
        val entity = new MyEntity();
        Assert.assertSame(entity, ds.add(entity));
        verify(em, times(1)).persist(entity);
    }

    @Test
    public void getAll() throws IllegalAccessException {
        val ds = new ServiceDatasource();
        val em = mock(EntityManager.class);
        val context = mock(EJBContext.class);
        val principal = mock(Principal.class);
        val query = mock(Query.class);
        FieldUtils.writeField(ds, "em", em, true);
        FieldUtils.writeField(ds, "context", context, true);
        val result = new ArrayList<MyEntity>();
        result.add(new MyEntity());
        val qStr = MessageFormat.format("SELECT e FROM {0} as e WHERE e.username = :usr", MyEntity.class.getName());
        when(em.createQuery(qStr)).thenReturn(query);
        when(context.getCallerPrincipal()).thenReturn(principal);
        when(principal.getName()).thenReturn("jdoe");
        when(query.getResultList()).thenReturn(result);
        ds.getAll(MyEntity.class);
        verify(em, times(1)).createQuery(qStr);
        verify(query, times(1)).getResultList();
        verify(principal, times(1)).getName();
    }

}
