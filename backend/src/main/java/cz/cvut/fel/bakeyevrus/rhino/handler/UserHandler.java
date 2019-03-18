package cz.cvut.fel.bakeyevrus.rhino.handler;

import cz.cvut.fel.bakeyevrus.rhino.dto.ErrorResponseDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserLoginRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserLoginResponseDto;
import cz.cvut.fel.bakeyevrus.rhino.dto.UserRegisterRequestDto;
import cz.cvut.fel.bakeyevrus.rhino.mapper.UserMapper;
import cz.cvut.fel.bakeyevrus.rhino.service.UserService;
import cz.cvut.fel.bakeyevrus.rhino.util.PasswordDecoder;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;

import java.net.URI;

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
                .flatMap(savedUser ->
                        ServerResponse
                                .created(URI.create("http://localhost:8080/api/v1/user/" + savedUser.getId()))
                                .syncBody(savedUser)
                )
                .onErrorResume(
                        throwable -> throwable instanceof ServerWebInputException,
                        (err) -> {
                            log.info(err.getMessage());
                            return ServerResponse.badRequest().build();
                        }
                );
    }

    public Mono<ServerResponse> login(ServerRequest request) {

        Mono<UserLoginResponseDto> response = request
                .bodyToMono(UserLoginRequestDto.class)
                .doOnNext(userCred -> validator.validate(userCred))
                .flatMap(userCred -> userService.login(userCred.getEmail(), PasswordDecoder.base64Decode(userCred.getPassword())))
                .map(UserLoginResponseDto::new);

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
