import {
  loginUser,
  logout,
  refreshAccessToken,
  registerUser,
} from "../controllers/authControllers";
import { withAuth } from "../middlewares/authMiddleware";
import { withValidation } from "../middlewares/validation";
import { LoginSchema, RefreshSchema, UserSchema } from "../types/user";

export const authRoutes = {
  "/login": {
    POST: withValidation(LoginSchema, loginUser),
  },
  "/register": {
    POST: withValidation(UserSchema, registerUser),
  },
  "/logout": {
    POST: withAuth(logout),
  },
  "/refresh": {
    POST: withValidation(RefreshSchema, refreshAccessToken),
  },
};
