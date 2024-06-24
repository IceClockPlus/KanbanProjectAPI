const express = require('express');
const router = express.Router();

const {
    getBoards,
    getBoardById,
    createBoard,
    deleteBoard
} = require('@controllers/board-controller');
const { authorize } = require('@middlewares/auth-middleware')

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *      ErrorResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *      NewBoardRequest:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Board name
 *      Board:
 *          type: object
 *          required:
 *              - _id
 *              - name
 *              - createdAt
 *              - updatedAt
 *              - __v
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Auto-generated id of board
 *              name:
 *                  type: string
 *                  description: Board name
 *              createdAt:
 *                  type: string
 *                  format: date
 *                  description: Board creation date
 *              updatedAt:
 *                  type: string
 *                  format: date
 *                  description: Board last update date
 *              __v:
 *                  type: number
 *                  description: Board versioning number
 * 
 * tags:
 *  name: Boards
 *  description: The board managing API
 * /api/v1/boards:
 *  get:
 *      summary: Returns a list of boards
 *      tags: [Boards]
 *      description: Returns a list of boards from the database
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Board'
 *  post:
 *      summary: Create a new board
 *      tags: [Boards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewBoardRequest'
 *          responses:
 *              200:
 *                  description: The created board
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Board'
 *              500:
 *                  description: Unexpected server error
 * /api/v1/boards/{id}:
 *  get:
 *      summary: Get board by id
 *      tags: [Boards]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The board id
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Board'
 *          404:
 *              description: Board not found
 */

router.get('/', getBoards);
router.get('/:id', getBoardById);
router.post('/', authorize, createBoard);
router.delete('/:id', deleteBoard);

module.exports = router;
