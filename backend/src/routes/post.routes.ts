import { Router } from "express";
import { addPostController, deletePostController, getPostsController, updatePostController } from "../controllers/post.controller";
import { authenticateJWT } from "../shared/auth.util";


const router = Router();

router.get('/', getPostsController); //Admin GET tags (display)
router.post('/', authenticateJWT, addPostController);
router.put('/', authenticateJWT, updatePostController);
router.delete('/', authenticateJWT, deletePostController);



export default router;