import { Router } from "express";
import { createProduct } from "../handlers/product";

const router: Router = Router()


router.post('/', createProduct)

export default router
