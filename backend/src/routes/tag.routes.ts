import { Router } from "express";
import { addTagController, deleteTagController, getTagsController, updateTagController } from "../controllers/tag.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get('/', getTagsController); //Admin GET tags (display)
router.post('/', authenticateJWT, addTagController);
router.put('/', authenticateJWT, updateTagController);
router.delete('/', authenticateJWT, deleteTagController);



export default router;
 