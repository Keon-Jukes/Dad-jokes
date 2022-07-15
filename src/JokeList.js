import React, {Component} from "react";
import acios from 'axios';

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
        console.log(jokes);
        this.setState({jokes: jokes});
      
    }
    render(){
        return(
            <div className="Jokelist">
                <h1>Dad Jokes</h1>
                <div className="Jokelist-jokes">
                    {this.state.jokes.map(j => (<div>
                        {j}
                    </div>))}
                </div>
            </div>
        )
    }
}

export default JokeList;