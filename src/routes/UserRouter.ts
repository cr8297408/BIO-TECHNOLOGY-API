import { Router } from 'express';
import { UserComponent } from '@/components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v2/users
 *
 * @swagger
 * /v2/users:
 *   get:
 *     description: Get all stored users in Database
 *     tags: ["users"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
 
router.get('/', UserComponent.findAll);

/**
 * GET method route
 * @example http://localhost:PORT/v2/users/pagination?page=1&size=2
 *
 * @swagger
 * /v2/users/pagination?
 *   get:
 *     description: Get all stored users in Database
 *     tags: ["users"]
 *     security:
 *      - bearerAuth: []
 *     - in: path
 *        name: page?size
 *        description: page an sie paginatin
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: A little array of users
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
 
router.get('/pagination', UserComponent.findPagination);

/**
 * POST method route
 * @example http://localhost:PORT/v2/users
 *
 * @swagger
 * /v2/users:
 *   post:
 *      description: Create new User
 *      tags: ["users"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *            example:
 *              name: userName
 *              email: test.user@mail.com
 *              password: test_test
 *              facebook: testface
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.post('/', UserComponent.create); // ruta prueba con mysql

/**
 * GET method route
 * @example http://localhost:PORT/v2/users/:id
 *
 * @swagger
 * /v2/users/{id}:
 *  get:
 *    description: Get user by userId
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */

router.get('/:id', UserComponent.findOne); // ruta prueba con mysql

/**
 * DELETE method route
 * @example  http://localhost:PORT/v2/users/:id
 *
 * @swagger
 * /v2/users/{id}:
 *  delete:
 *    description: Delete user by userId
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */

router.delete('/:id', UserComponent.remove); // ruta prueba con mysql

/**
 * @export {express.Router}
 */
export default router;
