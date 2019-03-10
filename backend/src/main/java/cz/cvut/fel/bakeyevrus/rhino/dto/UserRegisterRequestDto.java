package cz.cvut.fel.bakeyevrus.rhino.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class UserRegisterRequestDto implements Serializable {

    @NotEmpty(message = "First name cannot be empty")
    private String firstName;

    @NotEmpty(message = "Last name cannot be empty")
    private String lastName;

    @NotNull
    @Email
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    private String password;
}
