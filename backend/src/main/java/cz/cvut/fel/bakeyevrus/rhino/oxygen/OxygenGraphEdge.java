package cz.cvut.fel.bakeyevrus.rhino.oxygen;

import structure.AbstractGraphCell;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

class OxygenGraphEdge extends AbstractGraphCell implements Serializable {

    /**
     * Used in the edit table for avoiding the loop calling after adding an edge
     * to the edit table.
     */
    private boolean inserted;

    public OxygenGraphEdge(String name, String priority) {
        super(name);
        setPriority(priority);
        inserted = false;
    }

    public boolean isInserted() {
        return inserted;
    }

    public void setInserted(boolean inserted) {
        this.inserted = inserted;
    }

    @Override
    public String toString() {
        return name;
    }

    public List<String> getFields() {
        List<String> f = new ArrayList<>();
        f.add(name);
        f.add(description);
        f.add(priority);
        return f;
    }

    public void setFields(List<String> fields) {
        name = fields.get(0);
        description = fields.get(1);
        priority = fields.get(2);
    }
}
