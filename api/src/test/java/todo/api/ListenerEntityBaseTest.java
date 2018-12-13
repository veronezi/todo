package todo.api;

import lombok.val;
import org.junit.Assert;
import org.junit.Test;

public class ListenerEntityBaseTest {

    private static final String TYPE_4_UUID = "[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}";

    private class MyEntity extends EntityBase {
        // no-op
    }

    @Test
    public void type4Test() {
        val entity = new MyEntity();
        entity.username = "jdoe";
        new ListenerEntityBase().prepareId(entity);
        Assert.assertNotNull(entity.getId());
        Assert.assertTrue(entity.getId().matches(TYPE_4_UUID));
    }
}
