import { Router } from "express";
import { addCategoryController, deleteCategoryController, getCategories, updateCategoryController } from "../controllers/category.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get('/', getCategories); //Admin GET categories (display)
router.post('/', authenticateJWT, addCategoryController); // client POST categories (add)
router.put('/', authenticateJWT, updateCategoryController); // client PUT categories (update)
router.delete('/', authenticateJWT, deleteCategoryController); // DELETE categories (delete)


export default router;
