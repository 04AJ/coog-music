import React, {Component} from 'react';
import axios from "axios";
import PopularTracksTable from "./tables/PopularTracksTable";

class PopularTracks extends Component{
    constructor(props){
        super(props);
        this.state = { genre: '0', gender: '0', ethnicity: '0',data: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault(); 
        const state = this.state;
        axios
            .get(`/api/reportPopularTracks?genre=${state.genre}&gender=${state.gender}&ethnicity=${state.ethnicity}`)
            .then((res) => {
                console.log(res.data);
                this.setState({data:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
    }

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
                <h1>Popular Tracks Based On Artist</h1>
                <div className="flex-1 items-center text-center border rounded w-auto py-2 px-2">
                    <form onSubmit={this.handleSubmit} className="flex-1 items-center">
                        <label className="form-label">Artist Gender:</label>
                        <select className="ml-2 mr-4" name="gender" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <label className="form-label">Artist Ethnicity:</label>
                        <select className="ml-2 mr-4" name="ethnicity" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Asian</option>
                            <option value="2">Hispanic</option>
                            <option value="3">African American</option>
                            <option value="4">White</option>
                        </select>

                        <label className="form-label">Genre:</label>
                        <select className="ml-2 mr-4" name="genre" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Hip Hop</option>
                            <option value="2">Pop</option>
                            <option value="3">Country</option>
                            <option value="4">Rock</option>
                            <option value="5">Indie</option>
                            <option value="6">R&B</option>
                            <option value="7">Jazz</option>
                            <option value="8">Metal</option>
                            <option value="9">Classical</option>
                            <option value="10">Punk</option>
                        </select>
                        <div className="pt-2">
                            <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                            <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center space-x-8 mt-6'>
                    {(this.state.data.length) ? <PopularTracksTable data ={this.state.data}/> : <div></div>}
                </div>
            </div>
        );
    }
}

export default PopularTracks;