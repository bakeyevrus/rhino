package cz.cvut.fel.bakeyevrus.rhino;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.test.StepVerifier;

import java.util.Arrays;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RhinoApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Test
    public void reactiveProgramming() {
        var greetings = Flux.just("Hello", "Dear", "World").collectList();

        StepVerifier.create(greetings)
                .expectNext(Arrays.asList("Dear", "World", "Hello"))
                .verifyComplete();

    }

}
