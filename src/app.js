const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositorytId (request, response, next){
  const { id } = request.params;

  if(!isUuid(id)){
      return response.status(400).json({ error: 'Invalid Project Id.' });
  }

  return next();
}

app.use('/repositories/:id', validateRepositorytId);

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  var likes = 0;

  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
    
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  const likes = repositories[repositoryIndex].likes;

  if (repositoryIndex < 0){
      return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = {
      id,
      title,
      url,
      techs,
      likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
    
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);
    
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
    
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
