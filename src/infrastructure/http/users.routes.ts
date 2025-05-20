import { getSelfUser } from "./controllers/user.controller.js";
import router from "./root.routes.js";

router.get("/@me", getSelfUser);

export default router;