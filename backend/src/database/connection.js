const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-pdycg.mongodb.net/quiz?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

module.exports = connection;