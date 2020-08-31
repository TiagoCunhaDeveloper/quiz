const request = require('supertest');
const app = require('../../src/app');

describe('QUESTION', () => {
    it('should be able to CREATE a crud of QUESTION', async () => {
        const responseCreate = await request(app).post('/questions').send({
            category: "1",
            type: "multiple",
            difficulty: "hard",
            question: "Electronic music producer Kygos popularity skyrocketed after a certain remix. Which song did he remix?",
            correct_answer: "Ed Sheeran - I See Fire",
            incorrect_answers: [
                "Marvin Gaye - Sexual Healing",
                "Coldplay - Midnight",
                "a-ha - Take On Me"
            ]
        })
        const responseShow = await request(app).get(`/questions/`+ responseCreate.body._id);
        const responseIndex = await request(app).get('/questions/20/1/hard');
        const responseUpdate = await request(app).put('/questions/' + responseCreate.body._id).send({ //Atualizando um produto
            question: "Teste Atualizado",
        });
        const responseDelete = await request(app).delete(`/questions/`+ responseCreate.body._id);

        expect(responseCreate.body).toHaveProperty('_id');
        expect(responseShow.body).toHaveProperty('_id');
        expect(responseIndex.body.docs).not.toHaveLength(0);
        expect(responseUpdate.body.question).toBe('Teste Atualizado');
        expect(responseDelete.body.message).toBe('Successfully deleted!');
    })

    it('should be able to VALIDATE all routes of QUESTION', async () => {
        const responseCreate = await request(app).post('/questions').send({
            category: "1",
            type: "multiple",
            difficulty: "hardddd",
            question: "Electronic music producer Kygos popularity skyrocketed after a certain remix. Which song did he remix?",
            correct_answer: "Ed Sheeran - I See Fire",
            incorrect_answers: [
                "Marvin Gaye - Sexual Healing",
                "Coldplay - Midnight",
                "a-ha - Take On Me"
            ]
        })
        const responseShow = await request(app).get(`/questions/5ea34410b41f160eb840d9`);
        const responseUpdate = await request(app).put('/questions/5ea34410b41f160eb840d9').send({ //Atualizando um produto
            question: "Teste Atualizado",
        });
        const responseDelete = await request(app).delete(`/questions/5ea34410b41f160eb840d9`);

        expect(responseCreate.body.validation.keys).toEqual(["difficulty"]);
        expect(responseShow.body.validation.keys).toEqual(["id"]);
        expect(responseUpdate.body.validation.keys).toEqual(["id"]);
        expect(responseDelete.body.validation.keys).toEqual(["id"]);
    })
});