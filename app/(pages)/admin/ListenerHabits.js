import React, {Component} from 'react';
import axios from "axios";
import PopularTracksTable from "./tables/PopularTracksTable";

class ListenerHabits extends Component{
    constructor(props){
        super(props);
        this.state = { ageGroup: '0', gender: '0', ethnicity: '0', artistOrGenre:'0' ,data: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault(); 
        const state = this.state;
        axios
            .get(`/api/reportListenerHabits?ageGroup=${state.ageGroup}&gender=${state.gender}&ethnicity=${state.ethnicity}`)
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
                <h1>listener habits</h1>
                <div className="flex-1 items-center text-center border rounded w-auto py-2 px-2">
                    <form onSubmit={this.handleSubmit} className="flex-1 items-center">
                        <label className="form-label">Gender:</label>
                        <select className="ml-2 mr-4" name="gender" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <label className="form-label">Ethnicity:</label>
                        <select className="ml-2 mr-4" name="ethnicity" onChange={this.handleChange} defaultValue="0">
                            <option value="0">All</option>
                            <option value="1">Asian</option>
                            <option value="2">Hispanic</option>
                            <option value="3">African American</option>
                            <option value="4">White</option>
                        </select>

                        <label className="form-label">Age: </label>
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
                {(this.state.data.length) ? <PopularTracksTable data ={this.state.data}/> : <div></div>}
            </div>
        );
    }
}

export default ListenerHabits;