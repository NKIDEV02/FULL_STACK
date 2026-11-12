import { Router } from "express";
import { addCommentController, deleteCommentController, getPostCommentsController, updateCommentController } from "../controllers/comment.controller";


const router = Router();

router.get('/:postId', getPostCommentsController); //Admin GET comments (display)
router.post('/', addCommentController);
router.put('/', updateCommentController);
router.delete('/', deleteCommentController);



export default router;