package dk.michaelbui.yata.api.exceptionmappers;

import dk.michaelbui.yata.api.dtos.ApiResponse;
import dk.michaelbui.yata.api.dtos.ApiResponseBuilder;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Provider
public class DefaultExceptionMapper implements ExceptionMapper<Exception> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultExceptionMapper.class);

    @Override
    public Response toResponse(Exception e) {
        LOGGER.error(e.getMessage(), e);
        ApiResponseBuilder apiResponse = ApiResponse.builder()
                .statusCode(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());

        if (e.getMessage() != null && !e.getMessage().isBlank()) {
            apiResponse.error(e.getMessage());
        }

        return apiResponse.build().toResponse();
    }
}
