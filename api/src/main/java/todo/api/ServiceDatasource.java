package todo.api;

import lombok.val;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJBContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

import static javax.ejb.TransactionAttributeType.SUPPORTS;

@Stateless
@RolesAllowed({"todo"})
public class ServiceDatasource {

    @PersistenceContext(unitName = "todo-unit")
    private EntityManager em;

    @Resource
    private EJBContext context;

    private <T extends EntityBase> void validateAccess(T entity) {
        if (!Objects.equals(context.getCallerPrincipal().getName(), entity.username)) {
            throw new ExceptionAccessDenied(MessageFormat.format(
                    "The user ''{0}'' tried to access a todo from another user. Only ''{1}'' can access this object",
                    context.getCallerPrincipal().getName(),
                    entity.username
            ));
        }
    }

    public <T extends EntityBase> T add(final T entity) {
        entity.username = context.getCallerPrincipal().getName();
        em.persist(entity);
        return entity;
    }

    public <T extends EntityBase> T update(final T entity) {
        if (entity.getId() == null) {
            throw new ExceptionMissingId(entity);
        }
        em.merge(entity);
        // at this time, username will come from db.
        validateAccess(entity);
        return entity;
    }

    public void purge() {
        deleteAll(EntityTodo.class);
    }

    private <T extends EntityBase> void deleteAll(Class<T> cls) {
        val query = em.createQuery(MessageFormat.format("DELETE FROM {0} as e", cls.getName()));
        query.executeUpdate();
    }

    @SuppressWarnings("unchecked")
    @TransactionAttribute(SUPPORTS)
    public <T extends EntityBase> List<T> getAll(final Class<T> cls) {
        val query = em.createQuery(MessageFormat.format(
                "SELECT e FROM {0} as e WHERE e.username = :usr",
                cls.getName()
        ));
        query.setParameter("usr", context.getCallerPrincipal().getName());
        return query.getResultList();
    }

    public <T extends EntityBase> T find(Class<T> cls, String id) {
        val entity = em.find(cls, id);
        validateAccess(entity);
        return entity;
    }

}
