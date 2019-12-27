import React, { Component } from 'react';
import './App.css';
import Details from './liste/PokemonDetails'
import Pokemon from './liste/Pokemons';

class App extends Component {

    render() {
        let button;
        const url=window.location.pathname;
        const url_path=url.split("/");
        const path=url_path[1];

        if(url !== "localhost:3000" && localStorage.getItem("id") === "" ||
            url !== "localhost:3000" && localStorage.getItem("id") === null)
        {
            localStorage.removeItem("id")
            localStorage.setItem("id",path);
        }

           if(localStorage.getItem("id") === "" || localStorage.getItem("id") === null)
            {
                button=<Pokemon/>
            }
            else if(localStorage.getItem("id") !== "")
           {
               button=<Details/>
            }
            return (
                <div className="App">
                    <h2> Pokedex</h2>
                    <br></br>
                    {button}
                </div>
            );

        }
}

export default App;