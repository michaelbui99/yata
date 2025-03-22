package dk.michaelbui.yata.api.exceptionmappers;

import dk.michaelbui.yata.api.dtos.ApiResponse;
import dk.michaelbui.yata.api.dtos.ApiResponseBuilder;
import dk.michaelbui.yata.exception.NotFoundException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    @Override
    public Response toResponse(NotFoundException exception) {
        ApiResponseBuilder apiResponse = ApiResponse.notFound();
        if (exception.getMessage() != null && !exception.getMessage().isEmpty()) {
            apiResponse.error(exception.getMessage());
        }
        return apiResponse.build().toResponse();
    }
}
