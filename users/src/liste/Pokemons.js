import React, { Component } from 'react';
import './style.css'

function searchingFor(term)
{
    if(term.match(/^([a-zA-Z])/g)) {
        return function (x) {
            return x.nom.includes(term) || !term
        }
    }
    else {
        return  function (x) {
            return x.ndex.includes(term) || !term
        }
    }
}

class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            term: ''
        };
        this.searchHandler = this.searchHandler.bind(this)
    }

    componentDidMount() {
        this.fetchListPokemonAll()
    }

    fetchListPokemonAll()
    {
        fetch('http://localhost:4242/pokemons')
            .then(res => res.json())
            .then(pokemons => this.setState({pokemons}));
    }

    searchHandler(event)
    {
        this.setState({term: event.target.value})
    }

    render() {
        const {pokemons,term}=this.state;
        return (
            <div>
                <div className="width-search form-group has-search">
                    <input type="text" className="form-control" placeholder="Search for name or number"
                           onChange={this.searchHandler}
                           value={term}/>
                </div>
                <ul className="container bordure-pokemon list-pokemon">
                    {pokemons.filter(searchingFor(term)).map(pokemon =>
                        <li className="pokemon-element" key={pokemon.ndex}>
                           <a href={pokemon.ndex}>
                               <img className="img-pokemon" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`}/>
                           </a>
                            <div className="pokemon_details">
                                <p>
                                    {pokemon.ndex}
                                </p>
                                <h5>
                                    {pokemon.nom}
                                </h5>
                                <span className={pokemon.type1}> {pokemon.type1}</span>
                                <span className={pokemon.type2}> {pokemon.type2}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

        );
    }
}
export default Pokemons;