import React, {Component} from 'react';
import axios from "axios";
import { getArtistByName } from '@/db';
import Table from './Table';


class ArtistSearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { passedName: "", data:[] }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({passedName: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const Pname = this.state.passedName;
        console.log(Pname);
        axios
            .get(`/api/artist?artist_name=${Pname}`)
            .then((res) => {
                console.log(res.data);
                this.setState({data:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
    }

    

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="w-80">
                    <h1>Artist ID Search</h1>
                    <div className="flex-1 items-center text-center border rounded py-2">
                        <input onChange={this.handleChange} name="passedName" className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Enter artist name"></input>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                    </div>
                </form>
                <Table data={this.state.data}/>
            </div>
        );
    }
}
export default ArtistSearchForm;