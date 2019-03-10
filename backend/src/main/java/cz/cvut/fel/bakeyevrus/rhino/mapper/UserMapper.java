package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.UserRegisterRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.model.User;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class UserMapper {

    public User toUser(UserRegisterRequestDto newUser) {
        var decodedPass = Base64.getDecoder().decode(newUser.getPassword());
        return new User(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getEmail(),
                // UTF-8 is default JSON encoding
                new String(decodedPass, StandardCharsets.UTF_8)
        );
    }
}
