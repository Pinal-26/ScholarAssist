import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> getUser(Authentication authentication) {
        if (authentication == null) {
            return null;
        }

        Map<String, Object> attributes =
                (Map<String, Object>) authentication.getPrincipal();

        return Map.of(
                "name", attributes.get("name"),
                "email", attributes.get("email"),
                "picture", attributes.get("picture")
        );
    }
}
