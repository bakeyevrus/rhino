package cz.cvut.fel.bakeyevrus.rhino;

import lombok.Data;
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
        @Data
        class MyHolder<T> {
            private T value;

            public MyHolder(T value) {
                this.value = value;
            }
        }


        Mono<MyHolder<String>> hey = Mono.just(new MyHolder<String>("Hey")).doOnNext(stringHolder -> stringHolder.setValue("Hey, World!")).log();
        StepVerifier.create(hey).expectNextMatches(stringHolder -> stringHolder.getValue().equals("Hey, World!")).expectComplete().verify();

    }

}
