import React, {Component} from 'react';
import axios from "axios";
import Collapsible from "./Collapsible";

class PopularTracks extends Component{
    constructor(props){
        super(props);
        this.state = { genre: '', gender: '', race: '', data: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleSubmit(e){}

    async handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    }

    async handleHide(e) {
        e.preventDefault();
        this.setState({data:[]});
    }

    render(){
        return(
            <div>
                <h1>popular</h1>
                <div className="flex-1 items-center text-center border rounded w-auto py-2 px-2">
                    <form onSubmit={this.handleSubmit} className="flex-1 items-center">
                        <label className="form-label">Gender:</label>
                        <select className="ml-2 mr-4" name="gender" onChange={this.handleChange} defaultValue="all">
                            <option value="all">All</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <label className="form-label">Race:</label>
                        <select className="ml-2 mr-4" name="race" onChange={this.handleChange} defaultValue="all">
                            <option value="all">All</option>
                            <option value="2">Black</option>
                            <option value="3">Asian</option>
                            <option value="4">A. Indian</option>
                            <option value="5">Hispanic</option>
                        </select>

                        <label className="form-label">Genre:</label>
                        <select className="ml-2 mr-4" name="genre" onChange={this.handleChange} defaultValue="all">
                            <option value="all">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <div className="pt-2">
                            <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                            <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                        </div>
                    
                    </form>
                </div>
            </div>
        );
    }
}

export default PopularTracks;