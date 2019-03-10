package cz.cvut.fel.bakeyevrus.rhino.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebInputException;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RequestBodyValidator {

    private Validator validator;

    @Autowired
    public RequestBodyValidator(Validator validator) {
        this.validator = validator;
    }

    /**
     * Executes validation(JSR-303) on passed object and throws ServerWebInputException in case it is not successful
     *
     * @param requestBody
     */
    public void validate(Object requestBody) {
        Set<ConstraintViolation<Object>> validationErrors = validator.validate(requestBody);
        if (!validationErrors.isEmpty()) {
            var errorMsg = validationErrors.stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(", "));
            throw new ServerWebInputException(errorMsg);
        }
    }
}
