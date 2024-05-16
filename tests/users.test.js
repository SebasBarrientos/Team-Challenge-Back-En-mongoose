const request = require("supertest");
const app = require("../index.js");


describe("testing/tasks", () => {

    const task = {
        name: "Lipiar cocina",
        description: "Aspirar alacenas",
    };

    test("Create a task", async () => {
        const res = await request(app)
            .post("/tasks")
            .send(task)
            .expect(201)
        const sendTask = {
            ...task,
            _id: res.body._id,
            completed: res.body.completed,
            __v: res.body.__v,

            createdAt: res.body.createdAt,
            updatedAt: res.body.updatedAt,
        };
        const newTask = res.body;
        expect(newTask).toEqual(sendTask);
    });
});
