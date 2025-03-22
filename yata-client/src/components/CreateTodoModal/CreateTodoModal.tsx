import {FC, useState} from "react";
import {Button, Group, Pill, PillGroup, PillsInput, Stack, Textarea, TextInput} from "@mantine/core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postTodo} from "../../data/todos.ts";
import {Todo} from "../../models/todo.ts";
import {QUERY_KEY} from "../../data/query-keys.ts";

export interface CreateTodoModalProps {
    closeModal: () => any;
}

export const CreateTodoModal: FC<CreateTodoModalProps> = ({closeModal}) => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    // TODO: Fetch all tags and use as suggestions for tag input.
    const [tags, setTags] = useState<string[]>([]);
    const [newTagBuffer, setNewTagBuffer] = useState<string>("");
    const [currentTagIndex, setCurrentTagIndex] = useState<number>(-1);

    const addNewTag = (tag: string) => {
        if (tags.includes(tag)) {
            return;
        }

        setCurrentTagIndex(currentTagIndex + 1);
        setTags([...tags, tag]);
    }

    const ensureCurrentTagIndex = () => {
        if (currentTagIndex >= tags.length) {
            setCurrentTagIndex(tags.length - 1);
        }
        if (tags.length > 0 && currentTagIndex < 0) {
            setCurrentTagIndex(0);
        }

        if (tags.length === 0) {
            setCurrentTagIndex(-1);
        }
    };
    const removeAtTagIndex = () => {
        ensureCurrentTagIndex();
        const tagToRemove = tags[currentTagIndex - 1];
        removeTag(tagToRemove);
    };
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
        setCurrentTagIndex(tags.length);
        ensureCurrentTagIndex();
    };

    const createTodoMutation = useMutation({
        mutationFn: (todo: Pick<Todo, "title" | "description"> & { tags: string[] }) => postTodo(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.TODOS]}).then(() => {
                closeModal();
            });
        }
    });

    return (
        <Stack>
            <TextInput
                label="Title"
                withAsterisk
                description="Choose title for your new TODO"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <Textarea
                label="Description"
                description="Choose description for your new TODO"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <PillsInput
                label="Tags"
                description="Add tags to your new TODO"
            >
                <PillGroup>
                    {tags.map(tag => <Pill withRemoveButton onRemove={() => removeTag(tag)}>{tag}</Pill>)}
                </PillGroup>
                <PillsInput.Field placeholder="Add tags"
                                  value={newTagBuffer}
                                  onChange={(event) => setNewTagBuffer(event.currentTarget.value)}
                                  onKeyDown={(event) => {
                                      if (event.key === "Enter" || event.key === "Space") {
                                          event.preventDefault();
                                          addNewTag(newTagBuffer);
                                          setNewTagBuffer("");
                                          setCurrentTagIndex(tags.length - 1);
                                      }
                                      if (event.key === "Backspace") {
                                          removeAtTagIndex();
                                      }
                                  }}
                />
            </PillsInput>
            <Group justify="space-between">
                <Button variant="subtle" onClick={() => closeModal()}>Cancel</Button>
                <Button onClick={() => createTodoMutation.mutate({title, description, tags})}>Create</Button>
            </Group>
        </Stack>
    )
}