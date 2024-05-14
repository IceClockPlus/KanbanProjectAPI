const express = require('express');
const router = express.Router();

const {
 registerNewUser
} = require('@controllers/user-controllers');

/**
 * @swagger
 * components:
 *  schemas:
 *      RegisterUserRequest:
 *          type: object
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: User first name
 *              lastName:
 *                  type: string
 *                  description: User last name
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password
 *      RegisterUserResponse:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Created user name
 *              lastName:
 *                  type: string
 *                  description: Created user last name
 *              email:
 *                  type: string
 *                  description: Created user email
 * tags:
 *  name: Users
 *  description: The user managing API
 * /api/v1/users:
 *  post:
 *      summary: Register a new user
 *      tags: [Users]
 *      description: Returns the info of the created user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterUserRequest'
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/RegisterUserResponse'
 *          500:
 *              descriptionn: Unexpected server error
 */
router.post('/', registerNewUser);
module.exports = router;