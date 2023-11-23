import React, {Component} from 'react';
import axios from "axios";
import MostLikedSongsTable from './tables/MostLikedSongsTable';


class MostLikedSongs extends Component{
    constructor(props){
        super(props);
        this.state = { view: false, data: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    // async handleChange(e) {
    //     e.preventDefault();
    //     this.setState({passedName: e.target.value});
    // }
    async handleClick(e) {
        e.preventDefault();
        console.log(this.state.view);
        if(this.state.view === true){
            this.setState({view: false});
            this.setState({data: []});
        }else{
            this.setState({view: true});
            this.handleSubmit();
        }
    }

    async handleSubmit(){  //change to query for demographics   .. then if the input is empty return all     
        axios
            .get(`/api/reportMostLiked`)
            .then((res) => {
                console.log(res.data);
                this.setState({data:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
    }

    render(){ //on click -> change view to true, which gets the table and shit
        return(
            <div>
                <h1>Current Song Rankings</h1>
                <div className="flex-1 items-center text-center border rounded w-80 py-2">
                    <button onClick={this.handleClick} className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">View/Hide</button>
                </div>
                {(this.state.data.length) ? <MostLikedSongsTable data={this.state.data}/> : <div></div>}
            </div>
        );
    }
}
export default MostLikedSongs;