const mongoose = require('mongoose');
const moongosePaginate = require('mongoose-paginate');

const QuestionSchema = new mongoose.Schema({
    category: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    incorrect_answers: {
        type: [String],
        required: true,
    }
});

QuestionSchema.plugin(moongosePaginate);

module.exports = mongoose.model('Question',QuestionSchema);