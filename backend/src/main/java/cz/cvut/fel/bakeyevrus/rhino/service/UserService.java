package cz.cvut.fel.bakeyevrus.rhino.service;

import cz.cvut.fel.bakeyevrus.rhino.model.User;
import cz.cvut.fel.bakeyevrus.rhino.repository.UserRepository;
import cz.cvut.fel.bakeyevrus.rhino.security.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Log4j2
@Service
public class UserService implements ReactiveUserDetailsService {

    private UserRepository userRepo;
    private JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    public Mono<User> register(User user) {
        return userRepo.save(user);
    }

    public Mono<String> login(String username, String password) {
        return findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .map(jwtUtil::generateToken);
    }

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return userRepo.findByEmail(username).map(User::toUserDetails);
    }
}
