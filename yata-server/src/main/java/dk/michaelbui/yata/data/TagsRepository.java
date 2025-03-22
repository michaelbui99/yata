package dk.michaelbui.yata.data;

import dk.michaelbui.yata.model.Tag;

import java.util.List;

public interface TagsRepository {
    List<Tag> getAll();

    void create(Tag tag);
}
