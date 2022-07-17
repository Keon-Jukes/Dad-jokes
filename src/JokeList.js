import React, {Component} from "react";
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke'
import { v4 as uuid } from 'uuid';

class JokeList extends Component {
    static defaultProps = {
        numOfJokesToGet: 10
    };
    constructor(props){
        super(props)
        // get jokes array from local storage or parse an array string which will turn into a array
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
        };
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        if(this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes(){
        let jokes = [];
        while(jokes.length < this.props.numOfJokesToGet){
            let res = await axios.get('https://icanhazdadjoke.com/', {headers: {Accept: "application/json"}})
            jokes.push({id: uuid(), text : res.data.joke, votes: 0})
        }
        // get more jokes and copy existing ones for persistence
        this.setState(st => ({
            jokes: [...st.jokes, ...jokes]
        }));
        window.localStorage.setItem("jokes", JSON.stringify(jokes));
        // console.log(jokes);
    }

    handleClick(){
        this.getJokes();
    }

    handleVote(id, delta){
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? {...j, votes: j.votes + delta} : j)
            }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    render(){
        return(
            <div className="JokeList">
                <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad </span>Jokes
                </h1>
                <img src={'https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'} alt='laughing-emoji'/>
                <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
                </div>
               
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => <Joke  key={j.id} votes={j.votes} text={j.text} 
                    upvote={() => this.handleVote(j.id, 1)}
                    downvote={() => this.handleVote(j.id, -1)}
                    />)}
                </div>
            </div>
        )
    }
}

export default JokeList;