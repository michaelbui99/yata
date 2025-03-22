package dk.michaelbui.yata.exception;

public class InvalidTodoException extends RuntimeException{
    public InvalidTodoException() {
    }

    public InvalidTodoException(String message) {
        super(message);
    }
}
