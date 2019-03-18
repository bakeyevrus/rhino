package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.ErrorResponseDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserAuthResponseDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserLoginRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserRegisterRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.mapper.UserMapper;
import cz.cvut.fel.bakeyevrus.rhino.service.UserService;
import cz.cvut.fel.bakeyevrus.rhino.util.PasswordDecoder;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;

/*
 * TODO:
 * consider creating error handling layer which converts all business and dao exceptions into one type in order
 * to abstract controller from lower level errors.
 * See: https://dzone.com/articles/quotdecouplingquot-the-exception-puzzle
 */


@Log4j2
@Component
public class UserHandler {

    private UserMapper mapper;
    private UserService userService;
    private RequestBodyValidator validator;

    @Autowired
    public UserHandler(UserService userService, RequestBodyValidator validator, UserMapper mapper) {
        this.userService = userService;
        this.validator = validator;
        this.mapper = mapper;
    }

    public Mono<ServerResponse> register(ServerRequest request) {
        return request
                .bodyToMono(UserRegisterRequestDto.class)
                .doOnNext(userDto -> validator.validate(userDto))
                .map(mapper::toUser)
                .flatMap(userService::register)
                .map(UserAuthResponseDto::new)
                .flatMap(authResponse -> ServerResponse.ok().syncBody(authResponse))
                .onErrorResume(
                        ServerWebInputException.class,
                        (err) -> {
                            log.info(err.getMessage());
                            return ServerResponse.badRequest().build();
                        }
                )
                .onErrorResume(
                        DuplicateKeyException.class,
                        (err) -> ServerResponse.unprocessableEntity()
                                .syncBody(new ErrorResponseDto("Entered email already exists in database"))
                );
    }

    public Mono<ServerResponse> login(ServerRequest request) {

        Mono<UserAuthResponseDto> response = request
                .bodyToMono(UserLoginRequestDto.class)
                .doOnNext(userCred -> validator.validate(userCred))
                .flatMap(userCred -> userService.login(userCred.getEmail(), PasswordDecoder.base64Decode(userCred.getPassword())))
                .map(UserAuthResponseDto::new);

        return response
                .flatMap(loginResponse -> ServerResponse.ok().syncBody(loginResponse))
                .switchIfEmpty(
                        ServerResponse.status(HttpStatus.UNAUTHORIZED)
                                .syncBody(new ErrorResponseDto("Invalid credentials provided")))
                .onErrorResume(
                        throwable -> throwable instanceof ServerWebInputException,
                        (err) -> {
                            log.info(err.getMessage());
                            return ServerResponse.badRequest().build();
                        }
                );
    }
}
