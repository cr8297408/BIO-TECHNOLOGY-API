import { Router } from "express";
import { RolComponent } from "@/components";


/**
 * @constant {express.Router}
 */
const router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v2/roles
 *
 * @swagger
 * /v2/roles:
 *   get:
 *     description: Get all roles in the database
 *     tags: ["roles"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of roles
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Roles'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', RolComponent.findAll);


export default router;