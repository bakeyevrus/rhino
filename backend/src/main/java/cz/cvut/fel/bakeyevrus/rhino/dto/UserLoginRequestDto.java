package cz.cvut.fel.bakeyevrus.rhino.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class UserLoginRequestDto {

    @Email
    @NotNull
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    private String password;
}
