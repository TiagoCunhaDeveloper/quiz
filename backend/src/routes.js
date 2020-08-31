const {Router} = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const QuestionController = require('./controllers/QuestionController');

const routes = Router();

routes.get('/questions/:amount/:category/:difficulty?',QuestionController.index); //Listar pela categoria,e dificuldade + total de perguntas

routes.get('/questions/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().min(24)
    })
}), QuestionController.show); // Listar pelo id da questao

routes.post('/questions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category: Joi.number().required(),
        difficulty: Joi.string().required().min(4).max(6),
        type: Joi.string().required().min(7),
        question: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().required(),
    })
}),QuestionController.create); // Cadastrar

routes.put('/questions/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().min(24)
    }),
    [Segments.BODY]: Joi.object().keys({
        category: Joi.number().optional(),
        difficulty: Joi.string().optional().min(4).max(6),
        type: Joi.string().optional().min(7),
        question: Joi.string().optional(),
        correct_answer: Joi.string().optional(),
        incorrect_answers: Joi.array().optional(),
    })
}), QuestionController.update); // Atualizar

routes.delete('/questions/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().min(24)
    })
}), QuestionController.destroy); // Excluir

module.exports = routes;