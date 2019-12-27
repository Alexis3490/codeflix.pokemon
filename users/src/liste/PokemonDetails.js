import _  from 'lodash'
import React, {Component} from 'react';
import './style2.css'
import './style.css'

class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: {}
        };
    }

    componentDidMount() {
        this.fetchListPokemonId()
    }

    fetchListPokemonId() {
        let id;
        if (localStorage.getItem("id") === "" || localStorage.getItem("id") === null) {
            id = "";
        } else {
            id = localStorage.getItem("id")
        }

        fetch(`http://localhost:4242/pokemons/${id}`)
            .then(res => res.json())
            .then(pokemon => this.setState({pokemon: pokemon}))
    }

    back() {
        localStorage.removeItem("id")
        document.location.href = "http://localhost:3000"
    }


    render() {

        const url = document.location.href;

        if(url!== "http://localhost:3000/")
        {
            //document.location.href="http://localhost:3000/"
        }

        const {pokemon} = this.state;

        var stats = [];

        _.forEach(pokemon.attaques, function(obj) {
            var keys = Object.keys(obj);
            var ob = {};

            _.forEach(keys, function(key) {
                ob[key]= obj[key];
            })

            stats.push(ob);
        });


        window.onbeforeunload = function () {
            localStorage.removeItem("id")
           document.location.href="http://localhost:3000/"
        };

        return (
            <div className="container bordure-pokemon">
                <div className="row">
                    <div className="col">
                        <input id="back" className="btn btn-primary" type="submit"  onClick={this.back} value={`<  ${pokemon.ndex}   ${pokemon.nom}`}></input>
                        <br></br><br></br>
                            <img className="details-pokemon" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`}/>
                        <br></br> <br></br>
                        <div id="bordure_tb_type"></div>
                        <table className=" tb_img table table-dark">
                            <tr>
                                <th id="titre-pokemon-type" className="title-cols" colSpan="2"> Type</th>
                            </tr>
                            <tr>
                                <th scope="col">Type 1</th>
                                <th id="tb-pokemon-type2" scope="col">Type 2</th>
                            </tr>
                            <tr>
                                <td>{pokemon.type1}</td>
                                <td id="pokemon-type2">{pokemon.type2}</td>
                            </tr>
                        </table>
                   </div>
                    <div className="col">
                        <table className="table table-dark">
                            <tr>
                                <th className="title-cols" colSpan="7"> Caractérique</th>
                            </tr>
                            <tr>
                                <th scope="col">Espece</th>
                                <th scope="col">Taille</th>
                                <th scope="col">Poids</th>
                                <th scope="col">Forme</th>
                                <th scope="col">Couleur</th>
                                <th colSpan="2" scope="col">Bonus</th>
                            </tr>
                            <tr>
                                <td>{pokemon.espece}</td>
                                <td>{`${pokemon.taille} m`}</td>
                                <td>{`${pokemon.poids} kg`}</td>
                                <td> {`${pokemon.forme}`}</td>
                                <td> {`${pokemon.couleur}`}</td>
                                <td colSpan="2"> {`${pokemon.effortval}`}</td>
                            </tr>
                        </table>

                        <table className="table table-dark">
                            <tr>
                                <th className="title-cols" colSpan="5"> Statistique</th>
                            </tr>
                            <tr>
                                <th scope="col">Ratio</th>
                                <th scope="col">Oeuf pas</th>
                                <th scope="col">Capture évaluation</th>
                                <th scope="col">Exp valeur</th>
                                <th scope="col">Exp max</th>
                            </tr>
                            <tr>
                                <td>{pokemon.fmratio}</td>
                                <td>{`${pokemon.oeufpas} `}</td>
                                <td>{`${pokemon.captureval}`}</td>
                                <td>{`${pokemon.expval}`}</td>
                                <td>{`${pokemon.expmax}`}</td>
                                </tr>

                        </table>
                        <table className="table table-dark">
                            <tr>
                                <th id="titre-pokemon-aptitude" className="title-cols" colSpan="3"> Aptitude</th>
                            </tr>
                            <tr>
                                <th scope="col">Aptitude n°1</th>
                                <th id="tb-pokemon-aptitude2" scope="col">Aptitude n°2</th>
                                <th id="tb-pokemon-aptitude3" scope="col">Aptitude n°3</th>
                            </tr>
                            <tr >
                                <td>{pokemon.capspe1}</td>
                                <td id="pokemon-aptitude2">{pokemon.capspe2}</td>
                                <td id="pokemon-aptitude3">{pokemon.capspe3}</td>
                            </tr>
                        </table>

                        <table className="table table-dark">
                            <tr>
                                <th id="titre-pokemon-group" className="title-cols" colSpan="2"> Groupe</th>
                            </tr>
                            <tr>
                                <th scope="col">Groupe 1</th>
                                <th id="tb-pokemon-group2" scope="col">Groupe 2</th>
                            </tr>
                            <tr>
                                <td>{pokemon.groupoeuf1}</td>
                                <td id="pokemon-group2">{pokemon.groupoeuf2}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <ul className="container bordure-pokemon list-pokemon">
                        {stats.map(pokemon =>
                            <li className="table-attaque pokemon-element" key={pokemon.numero}>
                                <table className="table table-dark">
                                    <tr>
                                        <th colSpan="5"> Attaques</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Niveau</th>
                                        <th scope="col">Nom</th>
                                        <th  scope="col">Puissance</th>
                                        <th scope="col">Precision</th>
                                        <th scope="col">PP</th>
                                    </tr>
                                    <tr >
                                        <td>{pokemon.niveau}</td>
                                        <td>{pokemon.nom}</td>
                                        <td>{pokemon.puissance}</td>
                                        <td>{pokemon.precision}</td>
                                        <td>{pokemon.pp}</td>
                                    </tr>
                                </table>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        );
    }
}

export default Pokemons;