import { Router } from "express";
import { RolComponent } from "@/components";


/**
 * @constant {express.Router}
 */
const router = Router();

router.get('/', RolComponent.findAll);


export default router;