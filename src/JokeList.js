import React, {Component} from "react";
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
    static defaultProps = {
        numOfJokesToGet: 10
    };
    constructor(props){
        super(props)
        this.state = {
            jokes: []
        }
    }
    async componentDidMount(){
        let jokes = [];
        while(jokes.length < this.props.numOfJokesToGet){
            let res = await axios.get('https://icanhazdadjoke.com/', {headers: {Accept: "application/json"}})
            jokes.push(res.data.joke)
        }
        this.setState({jokes: jokes});
        console.log(jokes);
      
    }
    render(){
        return(
            <div className="Jokelist">
                <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad </span>Jokes
                </h1>
                <img src={'https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'} alt='laughing-emoji'/>
                <button className="JokeList-getmore">New Jokes</button>
                </div>
               
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (<div>
                        {j}
                    </div>))}
                </div>
            </div>
        )
    }
}

export default JokeList;