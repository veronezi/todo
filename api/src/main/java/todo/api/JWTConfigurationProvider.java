package todo.api;

import lombok.SneakyThrows;
import lombok.val;
import org.apache.tomee.microprofile.jwt.config.JWTAuthContextInfo;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Optional;

@Dependent
public class JWTConfigurationProvider {

    @Inject
    private JWTPublicKey publicKeyProvider;

    @Produces
    @SneakyThrows
    public Optional<JWTAuthContextInfo> getOptionalContextInfo() {
        val publicKeyPEM = publicKeyProvider.getPem();
        // decode to get the binary DER representation
        val publicKeyDER = Base64.getDecoder().decode(publicKeyPEM);
        val keyFactory = KeyFactory.getInstance("RSA");
        val publicKey = keyFactory.generatePublic(new X509EncodedKeySpec(publicKeyDER));
        val contextInfo = new JWTAuthContextInfo();
        contextInfo.setSignerKey((RSAPublicKey) publicKey);
        contextInfo.setExpGracePeriodSecs(10);
        return Optional.of(contextInfo);
    }

    @Produces
    public JWTAuthContextInfo getContextInfo() {
        return getOptionalContextInfo().orElseThrow(() -> new ExceptionApplication("missing context info"));
    }
}
