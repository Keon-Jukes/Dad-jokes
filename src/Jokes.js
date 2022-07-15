import React, {Component} from 'react';
import axios from 'axios';

const JOKES_URL = 'https://icanhazdadjoke.com/';

class Jokes extends Component {
    constructor(props){
        super(props)
        this.state = {
            jokes: [],
        }
    }

    async componentDidMount(){
        let res = await axios.get(JOKES_URL, {headers: {Accept: "application/json"}});
        let joke = res.data.joke;
        // this.setState({...this.state.jokes, jokes: joke.data})
        console.log('this is jokes --->', joke);

    }

    componentDidUpdate(){

    }

    render(){
        return(
        <div>
             <h1>Dad Jokes</h1>
             <button>New Jokes</button>
        </div>
        )
    }
}

export default Jokes;