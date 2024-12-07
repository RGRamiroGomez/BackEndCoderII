import passport from "./passport.mid.js";

const authenticate = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            if (!user) {
                return res.status(401).json({ message: info.message || "Unauthorized" });
            }
            req.user = user; // Asignar el usuario a la solicitud
            next(); // Llamar al siguiente middleware
        })(req, res, next); // Llamar a la función de autenticación
    };
};

export default authenticate;