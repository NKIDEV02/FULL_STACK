import { Router } from "express";
import { addCategoryController, deleteCategoryController, getCategories, updateCategoryController } from "../controllers/category.controller";

const router = Router();

router.get('/', getCategories); //Admin GET categories (display)
router.post('/', addCategoryController); // client POST categories (add)
router.put('/', updateCategoryController); // client PUT categories (update)
router.delete('/', deleteCategoryController); // DELETE categories (delete)


export default router;
