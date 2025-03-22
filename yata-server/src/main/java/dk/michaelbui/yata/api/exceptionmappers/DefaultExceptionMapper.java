package dk.michaelbui.yata.api.exceptionmappers;

import dk.michaelbui.yata.api.ApiResponse;
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
        return ApiResponse.builder()
                .statusCode(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode())
                .build()
                .toResponse();

    }
}
