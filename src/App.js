import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  let [count, setCount] = useState(1);

  //Listar os repositorios
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);

    });
  }, []);
  //[repositories]);

  //Contar o número de repositorios que projeto possui
  function countRepositories() {
    count = repositories.length + 1;
    setCount(count);

    //console.log(repositories.length)
  }

  //Adicionar o Repositório
  async function handleAddRepository() {
    countRepositories();

    const response = await api.post('/repositories', {
      title: `Repositório ${count}`, 
	    url: `https://github.com/XEdersonX/Repositório%20${count}`, 
	    techs: ["ReactJS"]
    });

    if (response.status === 200) {
      const repositorie = response.data;
      setRepositories([...repositories, repositorie]);

      console.log('🚀 Repositorio Adicionado com Sucesso!!');
    } else{
      console.log('🚀 Erro ao adicionar o repositorio da aplicação!!');
      return
    }

  }

  //Remover o Repositório
  async function handleRemoveRepository(id) {
    //id = 'd5483324-a9d9-4946-b866-f20630b6172a';
    const response = await api.delete(`/repositories/${id}`);
    console.log('Entrou Delete ' + id + '    ' + response.status);

    if (response.status === 204) {
      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

      if (repositorieIndex < 0) {
        //return response.status(400).json({error: 'Project not found.'});
        console.log('🚀 Erro ao remover o repositorio!!');
        return
      }

      repositories.splice(repositorieIndex, 1);

      setRepositories([...repositories]);
    }else{
      console.log('🚀 Erro ao remover o repositorio!!');
      return
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie => 
          <li key={repositorie.id}>
            {repositorie.title}

            {// Repositório 1
            }

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
