package dk.michaelbui.yata.api;

import jakarta.ws.rs.core.Response;

public class ApiResponse {
    private Object data;
    private String error;
    private int statusCode;

    public static ApiResponseBuilder builder() {
        return new ApiResponseBuilder();
    }

    public static ApiResponseBuilder notFound() {
        return new ApiResponseBuilder().statusCode(404);
    }

    public static ApiResponseBuilder ok(Object data) {
        return new ApiResponseBuilder().statusCode(200).data(data);
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public Response toResponse() {
        return Response
                .status(Response.Status.fromStatusCode(getStatusCode()))
                .entity(this)
                .build();
    }
}
