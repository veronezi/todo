package todo.api;

import liquibase.integration.cdi.CDILiquibaseConfig;
import liquibase.integration.cdi.annotations.LiquibaseType;
import liquibase.resource.ClassLoaderResourceAccessor;
import liquibase.resource.ResourceAccessor;
import lombok.val;

import javax.annotation.Resource;
import javax.enterprise.inject.Produces;
import javax.sql.DataSource;

public class ProducerLiquibase {

    @Resource
    private DataSource ds;

    @Produces
    @LiquibaseType
    public CDILiquibaseConfig getConfig() {
        val config = new CDILiquibaseConfig();
        config.setChangeLog("db_changelog/main.yaml");
        return config;
    }

    @Produces
    @LiquibaseType
    public DataSource getDataSource() {
        return ds;
    }

    @Produces
    @LiquibaseType
    public ResourceAccessor getResourceAccessor() {
        return new ClassLoaderResourceAccessor(getClass().getClassLoader());
    }

}
