package dk.michaelbui.yata.data;

import io.quarkus.runtime.Startup;
import jakarta.inject.Singleton;
import org.sqlite.SQLiteDataSource;

@Startup
@Singleton
public class DatasourceProvider {
    private SQLiteDataSource dataSource = new SQLiteDataSource();

    public SQLiteDataSource getDataSource() {
        dataSource.setUrl("jdbc:sqlite:" + System.getProperty("user.home") + "/yata/yata.db");
        return dataSource;
    }
}
