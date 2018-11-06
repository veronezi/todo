package todo.api;

import org.apache.commons.io.FileUtils;
import org.apache.tomee.microprofile.jwt.config.JWTAuthContextInfo;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Optional;

@Dependent
public class JWTConfigurationProvider {

    @Inject
    @ConfigProperty(name = "PUBLIC_KEY_DIR")
    private String publickeyDir;

    @Produces
    Optional<JWTAuthContextInfo> getOptionalContextInfo() throws Exception {
        final File pubFile = Paths.get(publickeyDir, "todo_rsa.pub").toFile();
        final String publicKeyPEM = FileUtils.readFileToString(pubFile, StandardCharsets.UTF_8)
                .replaceAll("-----BEGIN (.*)-----", "")
                .replaceAll("-----END (.*)----", "")
                .replaceAll("\\s", "");
        // decode to get the binary DER representation
        final byte[] publicKeyDER = Base64.getDecoder().decode(publicKeyPEM);
        final KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        final PublicKey publicKey = keyFactory.generatePublic(new X509EncodedKeySpec(publicKeyDER));
        final JWTAuthContextInfo contextInfo = new JWTAuthContextInfo();
        contextInfo.setSignerKey((RSAPublicKey) publicKey);
        contextInfo.setExpGracePeriodSecs(10);
        return Optional.of(contextInfo);
    }

    @Produces
    JWTAuthContextInfo getContextInfo() throws Exception {
        return getOptionalContextInfo().orElseThrow(() -> new ExceptionApplication("missing context info"));
    }
}
