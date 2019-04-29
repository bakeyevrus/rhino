package cz.cvut.fel.bakeyevrus.rhino.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Custom validator for enums:
 * https://stackoverflow.com/questions/10445197/jsr-303-bean-validation-for-enum-fields
 */
public class EnumValueValidator implements ConstraintValidator<EnumValue, Object> {

    private Object[] enumValues;

    /**
     * Initializes the validator in preparation for
     * {@link #isValid(Object, ConstraintValidatorContext)} calls.
     * The constraint annotation for a given constraint declaration
     * is passed.
     * <p>
     * This method is guaranteed to be called before any use of this instance for
     * validation.
     * <p>
     * The default implementation is a no-op.
     *
     * @param constraintAnnotation annotation instance for a given constraint declaration
     */
    @Override
    public void initialize(EnumValue constraintAnnotation) {
        enumValues = constraintAnnotation.enumClass().getEnumConstants();
    }

    /**
     * Implements the validation logic.
     * The state of {@code value} must not be altered.
     * <p>
     * This method can be accessed concurrently, thread-safety must be ensured
     * by the implementation.
     *
     * @param value   object to validate
     * @param context context in which the constraint is evaluated
     * @return {@code false} if {@code value} does not pass the constraint
     */
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (null != value) {
            String contextValue = value.toString();

            for (Object enumValue : enumValues) {
                if (enumValue.toString().equals(contextValue)) {
                    return true;
                }
            }
        }

        return false;
    }
}
