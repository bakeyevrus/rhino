package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.model.User;
import cz.cvut.fel.bakeyevrus.rhino.repository.UserRepository;
import cz.cvut.fel.bakeyevrus.rhino.util.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Log4j2
@Service
public class UserService {

    private UserRepository userRepo;
    private JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public Mono<String> register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user)
                .map(jwtUtil::generateToken);
    }

    public Mono<String> login(String username, String password) {
        return userRepo.findByEmail(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(jwtUtil::generateToken);
    }
}
