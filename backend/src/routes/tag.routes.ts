import { Router } from "express";
import { addTagController, deleteTagController, getTagsController, updateTagController } from "../controllers/tag.controller";

const router = Router();

router.get('/', getTagsController); //Admin GET tags (display)
router.post('/', addTagController);
router.put('/', updateTagController);
router.delete('/', deleteTagController);



export default router;
 