import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import perguntas from "../perguntas.json";
import confetti from "canvas-confetti";
import "../index.css";

function Quiz() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const tratarResposta = (opcao) => {
    const respostaCorreta = opcao === perguntas[perguntaAtual].resposta;

    if (respostaCorreta) {
      setPontuacao(pontuacao + 1);
      toast.success("Correto!");
    } else {
      toast.error(
        `Incorreto! A resposta correta é: ${perguntas[perguntaAtual].resposta}`
      );
    }

    setRespostaCorreta(respostaCorreta);
    setAlternativaSelecionada(opcao);

    setTimeout(() => {
      if (perguntaAtual + 1 < perguntas.length) {
        setPerguntaAtual(perguntaAtual + 1);
        setRespostaCorreta(null);
        setAlternativaSelecionada(null);
      } else {
        setQuizFinalizado(true);
        lançarConfete();
      }
    }, 1000);
  };

  const lançarConfete = () => {
    const duracao = 3 * 1000;
    const fimAnimacao = Date.now() + duracao;

    (function quadro() {
      const tempoRestante = fimAnimacao - Date.now();
      if (tempoRestante <= 0) return;

      const quantidadeParticulas = 100 * (tempoRestante / duracao);
      confetti({
        particleCount: quantidadeParticulas,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });

      requestAnimationFrame(quadro);
    })();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      {!quizFinalizado ? (
        perguntaAtual < perguntas.length ? (
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex-none w-full md:w-1/2 p-4">
              {perguntas[perguntaAtual].imagem && (
                <img
                  src={perguntas[perguntaAtual].imagem}
                  className="image-quiz rounded-lg"
                />
              )}
            </div>
            <div className="flex-grow p-4">
              <h2 className="text-3xl mt-5">
                {perguntas[perguntaAtual].pergunta}
              </h2>
              <p className="mt-2">
                Pergunta: {perguntaAtual + 1}/{perguntas.length}
              </p>
              <ul className="mt-4">
                {perguntas[perguntaAtual].alternativas.map(
                  (alternativa, index) => {
                    const isSelecionada =
                      alternativa === alternativaSelecionada;
                    const isCorreta = respostaCorreta && isSelecionada;
                    const isIncorreta = !respostaCorreta && isSelecionada;

                    return (
                      <li key={index}>
                        <button
                          onClick={() => tratarResposta(alternativa)}
                          className={`w-full h-14 m-2 rounded-lg font-medium 
                                                    ${
                                                      isCorreta
                                                        ? "bg-green-500"
                                                        : isIncorreta
                                                        ? "bg-red-500"
                                                        : "bg-white text-black"
                                                    }`}
                        >
                          {alternativa}
                        </button>
                      </li>
                    );
                  }
                )}
              </ul>
              <Link to="/">
                <button className="bg-black text-white px-8 py-2 rounded-full mt-10 font-semibold w-full md:w-52 h-12 shadow-[0px_5px_0px_0px_rgba(216,213,234)]">
                  Reiniciar Quiz
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl">Parabéns!</h2>
            <p className="text-2xl">
              Sua pontuação: {pontuacao}/{perguntas.length}
            </p>
          </div>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-4xl">Parabéns!</h2>
          <h2 className="font-bold text-3xl">
            Sua pontuação: {pontuacao}/{perguntas.length}
          </h2>
          <Link to="/">
            <button className="bg-white text-black px-8 py-2 rounded-full mt-10 font-semibold w-full md:w-52 h-12 shadow-[0px_5px_0px_0px_rgba(216,213,234)]">
              Refazer Quiz
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Quiz;
