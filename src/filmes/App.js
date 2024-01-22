import { useEffect, useState } from "react";
import "../App.css";
import Filmes from "./filmes.json";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const lowerBusca = typeof busca === "string" ? busca.toLowerCase() : "";
  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(lowerBusca)
  );

  useEffect(() => {
    setFilmes(
      Filmes.data.filmes.filter((filme) =>
        filme.nome.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie.id === selectedMovie ? null : movie.id);
  };

  return (
    <div className="App">
      {selectedMovie ? (
        // Detailed view for the selected movie
        <div className="filmes-movie">
          {filmes.map((filme) => (
            <div key={filme.id}>
              {filme.id === selectedMovie && (
                <>
                  <img className="banner" src={filme.imagemBanner} alt={filme.nome} />
                  <p className="genero">{filme.genero}</p>
                  <p className="detalhes">
                    {filme.estrelas} 🕒️{filme.duracao}
                  </p>
                  <h2>{filme.nome}</h2>
                  <p className="descricao">{filme.descricao}</p>
                  <button className="botao">
                    <a href={filme.link}>Assista já</a>
                  </button>
                  <br /> <br />
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        // List view for all movies
        <>
          {filmes.length > 0 ? (
            filmesFiltrados.map((filme) => (
              <div className="filmes-item" key={filme.id} onClick={() => handleMovieClick(filme)}>
                <img className="imagem" src={filme.imagem} alt={filme.nome} />
                <p className="generoItem">{filme.genero}</p>
                <p className="detalhesItem">{filme.estrelas} </p>
                <p>{filme.nome}</p>
                <br /> <br />
              </div>
            ))
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
