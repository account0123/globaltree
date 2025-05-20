import { editUser, getSelfUser } from "./controllers/user.controller.js";
import router from "./root.routes.js";

router.get("/@me", getSelfUser);
router.patch("/@me", editUser);

export default router;