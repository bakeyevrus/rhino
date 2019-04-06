package cz.cvut.fel.bakeyevrus.rhino.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
public class Graph {

    @Id
    private ObjectId id;
    private String name;

}
