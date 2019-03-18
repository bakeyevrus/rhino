package cz.cvut.fel.bakeyevrus.rhino.mapper;

import cz.cvut.fel.bakeyevrus.rhino.dto.UserRegisterRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.model.User;
import cz.cvut.fel.bakeyevrus.rhino.util.PasswordDecoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toUser(UserRegisterRequestDto newUser) {
        return new User(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getEmail(),
                PasswordDecoder.base64Decode(newUser.getPassword())
        );
    }
}
