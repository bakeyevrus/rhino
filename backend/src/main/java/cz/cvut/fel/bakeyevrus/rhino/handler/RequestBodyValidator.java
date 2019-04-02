package cz.cvut.fel.bakeyevrus.rhino.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebInputException;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.validation.groups.Default;
import java.util.Arrays;
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
     * @param requestBody - object to validate
     * @param groups      - list of groups targeted for validation
     */
    public void validate(Object requestBody, Class<?>... groups) {
        var extendedGroups = addDefaultGroup(groups);
        Set<ConstraintViolation<Object>> validationErrors = validator.validate(requestBody, extendedGroups);
        if (!validationErrors.isEmpty()) {
            var errorMsg = validationErrors.stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(", "));
            throw new ServerWebInputException(errorMsg);
        }
    }

    private Class<?>[] addDefaultGroup(Class<?>... groups) {
        var extendedGroups = Arrays.copyOf(groups, groups.length + 1);
        extendedGroups[groups.length] = Default.class;

        return extendedGroups;
    }
}
