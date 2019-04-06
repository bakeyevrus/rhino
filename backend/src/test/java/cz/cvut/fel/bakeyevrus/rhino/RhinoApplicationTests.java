package cz.cvut.fel.bakeyevrus.rhino;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RhinoApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Test
    public void reactiveProgramming() {

        Mono<String> stringMono = Mono.empty().log().then(Mono.just("ASD")).log().defaultIfEmpty("Empty Mono");
        StepVerifier.create(stringMono).expectNext("Empty Mono").expectComplete().verify();

    }

}
