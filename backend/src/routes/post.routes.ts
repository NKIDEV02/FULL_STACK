import { Router } from "express";
import { addPostController, deletePostController, getPostsController, updatePostController } from "../controllers/post.controller";


const router = Router();

router.get('/', getPostsController); //Admin GET tags (display)
router.post('/', addPostController);
router.put('/', updatePostController);
router.delete('/', deletePostController);



export default router;