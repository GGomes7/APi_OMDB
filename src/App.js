// Importa os módulos necessários do React e Axios
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Define dois estados usando o hook useState: searchTerm e movies
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
  
  const [movies, setMovies] = useState([]); // Estado para armazenar os filmes encontrados

  // Função assíncrona para buscar filmes
  const searchMovies = async () => {
    try {
      // Faz uma requisição à API OMDB com o termo de busca e uma chave de API
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=8d68a9be`);

      //teste do consumo do json com mais detalhes que deu erro
      // const response2 = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=8d68a9be`);

      // Atualiza o estado de movies com os resultados da busca ou um array vazio se nenhum resultado for encontrado
      setMovies(response.data.Search || []);
    } catch (error) {
      // Em caso de erro, exibe uma mensagem no console
      console.error('Erro ao buscar filmes: ', error);
    }
  };

  return (
    <div className="container">
      <div className='div-title'>
        <h1 className="my-4">Busque por um título</h1>
        <h3 className="sub-title">(ex: Filmes, Séries ou Jogos...)</h3>
        
        <div className="input-group_mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Digite o nome aqui..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />

          <div className="input-group-append">
            <button 
              className="btn_btn-primary" 
              type="button" 
              onClick={searchMovies}
            >
              Buscar
            </button>
        </div>
      </div>
      
      </div>

      
        <div className="row">
          {movies.map((movie) => (
            <div className="col-lg-4_mb-4" key={movie.imdbID}>
              <div className="card_h-100">
                  <div className='div-interna'>
                      <img
                        src={movie.Poster}
                        className="card-img-top"
                        alt={movie.Title}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{movie.Title}</h5>
                        <p className="card-text">Ano: {movie.Year}</p>
                        <p className="card-text">Tipo: {movie.Type}</p>
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      

    </div>
  );
}

export default App;
