import passport, { } from "passport"
import { ExtractJwt, Strategy as Strategy } from "passport-jwt";
import { UserService } from "../service/user-service";
import { User } from "../model/user";


class AuthConfig {
    initialize() {
        passport.use("jwt", this.getStrategy());
    }

    private getStrategy(): Strategy {
        const params = {
            secretOrKey: "superspirit",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: false,
            session: false
        };

        return new Strategy(params, (payload: User, done) => {
            let userService = new UserService();

            userService.getById(payload.id).then(user => {
                return done(null, user, { message: "login OK" });
            })
            .catch(err => {
                return done(null, false, { message: "The user in the token was not found" });
            })
        });
    }
}

export default new AuthConfig(); 