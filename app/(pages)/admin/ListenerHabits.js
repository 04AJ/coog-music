import React, {Component} from 'react';
import axios from "axios";
import {ListenerHabitsGenreTable, ListenerHabitsArtistTable} from "./tables/ListenerHabitsTable";

class ListenerHabits extends Component{
    constructor(props){
        super(props);
        this.state = { ageGroup: '0', gender: '0', ethnicity: '0', artistOrGenre:'0', genreData: [], artistData: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault(); 
        const state = this.state;

        let ageOne, ageTwo;
        switch(state.ageGroup){
            case '0':
                ageOne=0;
                ageTwo=999;
                break;
            case '1':
                ageOne=0;
                ageTwo=15;
                break;
            case '2':
                ageOne=16;
                ageTwo=25;
                break;
            case '3':
                ageOne=26;
                ageTwo=35;
                break;
            case '4':
                ageOne=36;
                ageTwo=45;
                break;
            case '5':
                ageOne=46;
                ageTwo=999;
                break;
        }

        console.log(`age is ${ageOne} - ${ageTwo}`)
        axios //QUERY FOR GENRES TABLE
            .get(`/api/reportListenerHabitsGenre?ageOne=${ageOne}&ageTwo=${ageTwo}&gender=${state.gender}&ethnicity=${state.ethnicity}`)
            .then((res) => {
                console.log(res.data);
                this.setState({genreData:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });

        axios //QUERY FOR TOP ARTISTS
            .get(`/api/reportListenerHabitsArtist?ageOne=${ageOne}&ageTwo=${ageTwo}&gender=${state.gender}&ethnicity=${state.ethnicity}`)
            .then((res) => {
                console.log(res.data);
                this.setState({artistData:res.data});
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
        this.setState({genreData:[], artistData:[]});
    }

    render(){
        return(
            <div>
                <h1>Top Genres/Artists Based On User</h1>
                <div className="flex-1 items-center text-center border rounded w-auto p-3 border-slate-600 bg-neutral-900 ">
                    <form onSubmit={this.handleSubmit} className="flex-1 items-center">
                        <label className="form-label">Users Gender:</label>
                        <select className="ml-2 mr-4" name="gender" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <label className="form-label">Users Ethnicity:</label>
                        <select className="ml-2 mr-4" name="ethnicity" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Asian</option>
                            <option value="2">Hispanic</option>
                            <option value="3">African American</option>
                            <option value="4">White</option>
                        </select>

                        <label className="form-label">Users Age: </label>
                        <select className="ml-2 mr-4" name="ageGroup" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">0-15</option>
                            <option value="2">16-25</option>
                            <option value="3">26-35</option>
                            <option value="4">36-45</option>
                            <option value="5">46+</option>
                        </select>
                        <div className="pt-2">
                            <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                            <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                        </div>
                    </form>
                </div>
                <div className="flex mb-4 justify-center space-x-8 mt-6 w-auto">
                    <div className='w-1/4'>{(this.state.genreData.length) ? <ListenerHabitsGenreTable data ={this.state.genreData}/> : <div></div>}</div>
                    <div className='w-3/4'>{(this.state.artistData.length) ? <ListenerHabitsArtistTable className='w-3/4' data ={this.state.artistData}/> : <div></div>}</div>
                </div>
            </div>
        );
    }
}

export default ListenerHabits;