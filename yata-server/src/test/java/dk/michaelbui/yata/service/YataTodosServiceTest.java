package dk.michaelbui.yata.service;

import dk.michaelbui.yata.data.TagsRepository;
import dk.michaelbui.yata.data.TodosRepository;
import dk.michaelbui.yata.model.Tag;
import dk.michaelbui.yata.model.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class YataTodosServiceTest {
    private TodosRepository todosRepository;
    private TagsRepository tagsRepository;

    @BeforeEach
    void setup() {
        todosRepository = mock(TodosRepository.class);
        tagsRepository = mock(TagsRepository.class);
    }

    @Test
    void create_todoHasNonExistingTags_tagsAreCreated() {
        // Arrange
        Todo todo = new Todo();
        todo.setTags(List.of(
                new Tag("A"),
                new Tag("B"),
                new Tag("C")
        ));
        TodosService todosService = new YataTodosService(todosRepository, tagsRepository);

        when(todosRepository.create(any())).thenReturn(Optional.of(1));

        // Act
        Optional<Integer> id = todosService.create(todo);

        // Assert
        assertTrue(id.isPresent());
        assertEquals(1, id.get());
        verify(tagsRepository, times(3)).create(any());
        verify(tagsRepository, times(1)).create(argThat(tag -> tag.getName().equals("A")));
        verify(tagsRepository, times(1)).create(argThat(tag -> tag.getName().equals("B")));
        verify(tagsRepository, times(1)).create(argThat(tag -> tag.getName().equals("C")));
    }


    @Test
    void create_onlyCreateTagsThatDoesNotAlreadyExist() {
        // Arrange
        Todo todo = new Todo();
        todo.setTags(List.of(
                new Tag("A"),
                new Tag("B"),
                new Tag("C")
        ));
        TodosService todosService = new YataTodosService(todosRepository, tagsRepository);

        when(todosRepository.create(any())).thenReturn(Optional.of(1));
        when(tagsRepository.getAll()).thenReturn(List.of(
                new Tag("B")
        ));

        // Act
        Optional<Integer> id = todosService.create(todo);

        // Assert
        assertTrue(id.isPresent());
        assertEquals(1, id.get());
        verify(tagsRepository, times(2)).create(any());
        verify(tagsRepository, times(1)).create(argThat(tag -> tag.getName().equals("A")));
        verify(tagsRepository, times(0)).create(argThat(tag -> tag.getName().equals("B")));
        verify(tagsRepository, times(1)).create(argThat(tag -> tag.getName().equals("C")));
    }
}