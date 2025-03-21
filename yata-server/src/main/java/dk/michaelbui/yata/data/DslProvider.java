package dk.michaelbui.yata.data;

import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;

@Startup
@Singleton
public class DslProvider {
    private final DSLContext dsl;

    @Inject
    public DslProvider(DatasourceProvider datasourceProvider) {
        this.dsl = DSL.using(datasourceProvider.getDataSource(), SQLDialect.SQLITE);
    }

    public DSLContext getDsl() {
        return dsl;
    }
}
