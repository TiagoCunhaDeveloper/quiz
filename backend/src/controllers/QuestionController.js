const Question = require('../models/Question');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const category = parseInt(req.params.category);
        const limit = parseInt(req.params.amount);
        const difficulty = req.params.difficulty;
        let questions;
        if(difficulty){
            questions = await Question.paginate({ category,difficulty },{ page,limit });
            return res.json(questions);
        }else{
            questions = await Question.paginate({ category },{ page,limit });
            return res.json(questions);
        }
    },

    async show(req, res) {
        const question = await Question.findById(req.params.id);

        return res.json(question);
    },

    async create(req, res) {
        const question = await Question.create(req.body);

        return res.json(question);
    },

    async update(req, res) {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new:true })

        return res.json(question);
    },

    async destroy(req, res) {
        await Question.findByIdAndRemove(req.params.id);

        return res.json({ message: 'Successfully deleted!'});
    }

};