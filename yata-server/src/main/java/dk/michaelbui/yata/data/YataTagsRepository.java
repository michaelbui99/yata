package dk.michaelbui.yata.data;

import dk.michaelbui.yata.generated.tables.Tags;
import dk.michaelbui.yata.generated.tables.records.TagsRecord;
import dk.michaelbui.yata.model.Tag;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.jooq.Result;

import java.util.List;

@Startup
@Singleton
public class YataTagsRepository implements TagsRepository {
    private final DslProvider dslProvider;

    @Inject
    public YataTagsRepository(DslProvider dslProvider) {
        this.dslProvider = dslProvider;
    }

    @Override
    public List<Tag> getAll() {
        Result<TagsRecord> tagRecords = dslProvider.getDsl()
                .selectFrom(Tags.TAGS)
                .fetch();

        return tagRecords
                .map(t -> new Tag(t.getName(), t.getColor()))
                .stream()
                .toList();
    }

    @Override
    public void create(Tag tag) {
        dslProvider.getDsl()
                .insertInto(Tags.TAGS, Tags.TAGS.NAME, Tags.TAGS.COLOR)
                .values(tag.getName(), tag.getColor())
                .execute();
    }
}
