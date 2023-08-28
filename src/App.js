import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  return <MainBar />;

  function MainBar() {
    return (
      <>
        <header className="mainbar">
          <div className="mainMenu">
            <h1 className="titulo">TODO ALMUERZO 🍔</h1>
          </div>
        </header>
        <SearchBar />
      </>
    );
  }

  function SearchBar() {
    const [dataInput, setDataInput] = useState([]);
    return (
      <div>
        <div>
          <div className="imagenPortada">
            <div className="ElementosPortada">
              <input
                onChange={(e) => setDataInput(e.target.value)}
                className="searchInput"
              ></input>
              <h2 className="textoPrincipal">Buscame🌭🌭</h2>
              <h4 className="textoPrincipal">
                El mas grande repositorio de comida
              </h4>
            </div>
          </div>
        </div>
        <FoodContainer newInput={dataInput} />
      </div>
    );
  }

  function FoodContainer({ newInput }) {
    const [data, setData] = useState([]);
    useEffect(() => {
      let asyncFunction = async () => {
        // Simular una solicitud de API
        let fetchingData = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=p`
        );
        let jsonData = await fetchingData.json();
        setData([...jsonData.meals]);
      };
      asyncFunction();
    }, []);

    //useEffectBellowOnlyWillBeExecutedWhennewInputChange
    useEffect(() => {
      const controller = new AbortController(); //CREANDO LA INSTANCIA
      let asyncFunction = async () => {
        try {
          // Simular una solicitud de API
          let fetchingData = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${newInput}`,
            { signal: controller.signal } //AWAIT FETCH RETORNA UN ARREGLO DE OBJETOS, ESTOY AGREGANDO ESTO
          );
          let jsonData = await fetchingData?.json();
          if (!jsonData) throw new Error("No ha funcionado como es debido");
          setData([...jsonData.meals]);
        } catch (e) {}
      };
      asyncFunction();

      return function () {
        //ESTA FUNCION SE EJECUTA ENTRE CADA REENDERIZACION Y CUANDO EL COMPONENTE SE DESTRUYE
        controller.abort(); //ABORTANDO LA CONSULTA ANTERIOR
      };
    }, [newInput]);

    return (
      <div>
        <CantidadResultado cantidad={data.length} />
        <h1>Resultados🥓</h1>
        <div className="prueba48">
          {data.map((valor) => (
            <ListFoodContainer key={valor.idMeal} data={valor} />
          ))}
        </div>
      </div>
    );
  }

  function ListFoodContainer({ data }) {
    return (
      <div className="prueba49">
        <div>
          <h1>{data.strMeal} 😋</h1>
          <button>More detail😍</button>
        </div>
        <img className="imagenes" src={data.strMealThumb} alt="prueba"></img>
      </div>
    );
  }

  function CantidadResultado({ cantidad }) {
    return (
      <>
        <span className="tagResultadosgotten">
          {cantidad === 1
            ? cantidad + " Resultado🥓"
            : cantidad + " Resultados🥓"}
        </span>
      </>
    );
  }
}

export default App;
