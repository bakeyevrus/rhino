package cz.cvut.fel.bakeyevrus.rhino.util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class PasswordDecoder {

    private PasswordDecoder() {
        // utility class
    }

    public static String base64Decode(String base64EncodedPass) {
        var decodedPass = Base64.getDecoder().decode(base64EncodedPass);
        return new String(decodedPass, StandardCharsets.UTF_8);
    }
}
