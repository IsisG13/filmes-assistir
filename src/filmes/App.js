import { useEffect, useState } from "react";
import "../App.css";
import Filmes from "./filmes.json";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [filmeSelecionado, setFilmeSelecionado] = useState(1);

  const buscaMinusc = typeof busca === "string" ? busca.toLowerCase() : "";
  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(buscaMinusc)
  );

  useEffect(() => {
    setFilmes(
      Filmes.data.filmes.filter((filme) =>
        filme.nome.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca]);

  useEffect(() => {
    setFilmeSelecionado(1);
  }, []);

  const handleCliqueFilme = (filme) => {
    setFilmeSelecionado(filme.id === filmeSelecionado ? null : filme.id);
  };

  return (
    <div className="App">
      <div className="filmes-movie">
        {filmes.map((filme) => (
          <div key={filme.id}>
            {filme.id === filmeSelecionado && (
              <>
                <img
                  className="banner"
                  src={filme.imagemBanner}
                  alt={filme.nome}
                />
                <div className="conteudo-filmes">
                  <p className="genero">{filme.genero}</p>
                  <p className="detalhes">
                    {filme.estrelas} 🕒️{filme.duracao}
                  </p>
                  <h2>{filme.nome}</h2>
                  <p className="descricao">{filme.descricao}</p>
                  <button className="botao">
                    <a href={filme.link} target="_blank">Assista já</a>
                  </button>
                </div>
                {/* <br /> <br /> */}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="filmes-item-container">
        {filmesFiltrados
          .filter((filme) => filme.id !== filmeSelecionado)
          .map((filme) => (
            <div
              className="filmes-item"
              key={filme.id}
              onClick={() => handleCliqueFilme(filme)}
            >
              <div className="sombra-imagem"></div>
              <img className="imagem" src={filme.imagem} alt={filme.nome} />
              <div className="detalhesItem">
                <p className="generoItem">{filme.genero}</p>
                <p>{filme.estrelas} </p>
                <p>{filme.nome}</p>
              </div>
              <br /> <br />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
