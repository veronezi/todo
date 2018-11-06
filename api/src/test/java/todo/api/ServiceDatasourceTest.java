package todo.api;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.junit.Assert;
import org.junit.Test;

import javax.ejb.EJBContext;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

public class ServiceDatasourceTest {

    private class MyEntity extends EntityBase {
        // no-op
    }

    @Test
    public void addTest() throws IllegalAccessException {
        ServiceDatasource ds = new ServiceDatasource();
        EntityManager em = mock(EntityManager.class);
        EJBContext context = mock(EJBContext.class);
        Principal principal = mock(Principal.class);
        when(context.getCallerPrincipal()).thenReturn(principal);
        when(principal.getName()).thenReturn("jdoe");
        FieldUtils.writeField(ds, "context", context, true);
        FieldUtils.writeField(ds, "em", em, true);
        MyEntity entity = new MyEntity();
        Assert.assertSame(entity, ds.add(entity));
        verify(em, times(1)).persist(entity);
    }

    @Test
    public void getAll() throws IllegalAccessException {
        ServiceDatasource ds = new ServiceDatasource();
        EntityManager em = mock(EntityManager.class);
        EJBContext context = mock(EJBContext.class);
        Principal principal = mock(Principal.class);
        Query query = mock(Query.class);
        FieldUtils.writeField(ds, "em", em, true);
        FieldUtils.writeField(ds, "context", context, true);
        List<MyEntity> result = new ArrayList<>();
        result.add(new MyEntity());
        String qStr = "SELECT e FROM " + MyEntity.class.getName() + " as e WHERE e.username = :usr";
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
