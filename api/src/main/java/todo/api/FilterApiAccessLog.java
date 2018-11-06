package todo.api;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = {"/api/*"})
public class FilterApiAccessLog implements Filter {
    private static final String GUEST = "guest user";

    private String getUser(ServletRequest request) {
        try {
            return ((HttpServletRequest) request).getUserPrincipal().getName();
        } catch (Exception e) {
            return GUEST;
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // no-op
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        long init = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
        } finally {
            log.info("[{}] ({}) {} {}ms",
                    getUser(request),
                    ((HttpServletRequest) request).getMethod(),
                    ((HttpServletRequest) request).getRequestURI(),
                    System.currentTimeMillis() - init
            );
        }
    }

    @Override
    public void destroy() {
        // no-op
    }
}
