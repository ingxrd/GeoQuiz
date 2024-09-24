import livro from "../assets/livro.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center p-4">
        <img
          src={livro}
          className="w-[80%] md:w-[450px] h-auto md:h-[500px] mt-5"
        />
        <div className="text-left font-light p-5">
          <h1 className="text-white text-3xl md:text-4xl mb-0">Bem-vindos</h1>
          <h2 className="text-white text-3xl md:text-4xl">
            ao <b className="font-semibold">GeoQuiz</b> Academy!
          </h2>
          <Link to="/quiz">
            <button className="bg-white text-black px-8 py-2 rounded-full mt-10 font-semibold w-full md:w-52 h-12 shadow-[0px_5px_0px_0px_rgba(216,213,234)]">
              INICIAR
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
