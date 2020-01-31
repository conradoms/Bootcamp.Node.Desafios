const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {id: "1", title: "Projeto 1", tasks:["Nova tarefa"]},
    {id: "2", title: "Projeto 2", tasks:["Nova tarefa"]},
    {id: "3", title: "Projeto 3", tasks:["Nova tarefa"]}
];

let contadorDeChamadasAPI = 0;

server.use((req, res, next) => {
    contadorDeChamadasAPI++;
    console.log(contadorDeChamadasAPI);
    next();
});

function checkIfProjectExists(req, res, next){
    const id = req.params.id;
    
    if(!projects[id]){
        return res.json({ error: 'Não existe um projeto com este id!'});
    }

    req.id = id;
    next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;
    projects.push({id, title, tasks});
    return res.json(projects);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
    const { title } = req.body;

    projects[req.id].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
    projects.splice(req.id, 1);

    return res.json(projects);
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
    const { title } = req.body;

    projects[req.id].tasks.push(title);

    return res.json(projects);
});

server.listen(3030);