package dk.michaelbui.yata.api;

public class ApiResponseBuilder {
    private final ApiResponse response;

    protected ApiResponseBuilder() {
        response = new ApiResponse();
    }

    public ApiResponseBuilder statusCode(int statusCode) {
        this.response.setStatusCode(statusCode);
        return this;
    }

    public ApiResponseBuilder data(Object data) {
        this.response.setData(data);
        return this;
    }

    public ApiResponseBuilder error(String error) {
        this.response.setError(error);
        return this;
    }

    public ApiResponse build() {
        return response;
    }
}
