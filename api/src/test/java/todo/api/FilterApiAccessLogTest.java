package todo.api;

import lombok.val;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.only;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.*;

@RunWith(PowerMockRunner.class)
public class FilterApiAccessLogTest {
    private static final String PATTERN = "[{}] ({}) {} {}ms";
    private static final String METHOD = "GET";
    private static final String URL = "http://localhost/api/banana";

    private void prepare(final Logger logger, final HttpServletRequest request) throws IOException, ServletException {
        mockStatic(LoggerFactory.class);
        when(LoggerFactory.getLogger(FilterApiAccessLog.class)).thenReturn(logger);
        when(request.getMethod()).thenReturn(METHOD);
        when(request.getRequestURI()).thenReturn(URL);
        val response = mock(HttpServletResponse.class);
        val chain = mock(FilterChain.class);
        val filter = new FilterApiAccessLog();
        // Executing the filter
        filter.doFilter(request, response, chain);
    }

    @Test
    @PrepareForTest({LoggerFactory.class})
    public void logAuthenticated() throws IOException, ServletException {
        val logger = mock(Logger.class);
        val request = mock(HttpServletRequest.class);
        when(request.getUserPrincipal()).thenReturn(() -> "jdoe");
        prepare(logger, request);
        // Verify that we have the proper log message
        verify(logger, only()).info(
                eq(PATTERN),
                eq("jdoe"),
                eq(METHOD),
                eq(URL),
                any()
        );
    }

    @Test
    @PrepareForTest({LoggerFactory.class})
    public void logNonAuthenticated() throws IOException, ServletException {
        val logger = mock(Logger.class);
        val request = mock(HttpServletRequest.class);
        prepare(logger, request);
        verify(logger, only()).info(
                eq(PATTERN),
                eq("guest user"),
                eq(METHOD),
                eq(URL),
                any()
        );
    }
}
