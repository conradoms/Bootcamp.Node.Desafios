const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {id: "1", title: "Projeto 1", tasks:["Nova tarefa"]},
    {id: "2", title: "Projeto 2", tasks:["Nova tarefa"]},
    {id: "3", title: "Projeto 3", tasks:["Nova tarefa"]}
];

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;
    projects.push({id, title, tasks});
    return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    projects[id].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    projects.splice(id, 1);

    return res.json(projects);
});

server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].tasks.push(title);

    return res.json(projects);
});

server.listen(3030);