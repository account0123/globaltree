import { editUser, getSelfUser, setSelfUserAvatar } from "./controllers/user.controller.js";
import router from "./root.routes.js";

router.get("/@me", getSelfUser);
router.patch("/@me", editUser);
router.put("/@me/avatar", setSelfUserAvatar);

export default router;