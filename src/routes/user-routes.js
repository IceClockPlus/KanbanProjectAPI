const express = require('express');
const router = express.Router();

const {
 registerNewUser,
 authenticateUser,
 getMyInfo
} = require('@controllers/user-controllers');

const { authorize } = require('@middlewares/auth-middleware')

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
 *      AuthenticationUserRequest:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password to authenticate
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *              token: 
 *                  type: string
 *                  description: Generated JWT
 *              success:
 *                  type: boolean
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
 *                          $ref: '#/components/schemas/RegisterUserResponse'
 *          500:
 *              descriptionn: Unexpected server error
 * /api/v1/users/login:
 *  post:
 *      summary: Authenticate user
 *      tags: [Users]
 *      description: Returns the authentication token (JWT) to access to other functions
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AuthenticationUserRequest'
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticationResponse'
 * 
 */
router.post('/', registerNewUser);
router.post('/login', authenticateUser);
router.get('/myInfo', authorize, getMyInfo);
module.exports = router;