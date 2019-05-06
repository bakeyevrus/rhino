package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import structure.AbstractGraphCell;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

class OxygenGraphNode extends AbstractGraphCell implements Serializable {

    OxygenGraphNode(String name) {
        super(name);
    }

    @Override
    public String toString() {
        return name;
    }

    public String getName() {
        return name;
    }

    public List<String> getFields() {
        List<String> f = new ArrayList<>();
        f.add(name);
        f.add(description);
        f.add(priority);
        return f;
    }

    public int getPanelId() {
        return 4;
    }

    public void setFields(List<String> fields) {
        name = fields.get(0);
        description = fields.get(1);
        priority = fields.get(2);
    }
}
