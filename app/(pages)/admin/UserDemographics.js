import React, {Component} from 'react';
import axios from "axios";
import UserRaceTable from './UserRaceTable';
import UserGenderTable from './UserGenderTable';



class UserDemographics extends Component{
    constructor(props){
        super(props);
        this.state = { passedID: "", raceData:[], genderData:[], ageData:[] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({passedID: e.target.value});
    }

    async handleHide(e) {
        e.preventDefault();
        this.setState({raceData:[], genderData:[], ageData:[]});
    }

    async handleSubmit(e){  //change to query for demographics   .. then if the input is empty return all 
        e.preventDefault();    
        const passedID = this.state.passedID;
        console.log(passedID);
        axios //RACE QUERY
            .get(`/api/reportRace?artist_id=${passedID}`)
            .then((res) => {
                console.log(res.data);
                this.setState({raceData:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
        axios //GENDER QUERY
            .get(`/api/reportGender?artist_id=${passedID}`)
            .then((res) => {
                console.log(res.data);
                this.setState({genderData:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
        // axios //AGE QUERY
        //     .get(`/api/reportAge?artist_id=${passedID}`)
        //     .then((res) => {
        //         console.log(res.data);
        //         this.setState({genderData:res.data});
        //     })
        //     .catch((err) => {
        //         console.error("this is an error ", err);
        // });
    }

    render(){ //create multiple tables for demographic stats
        return(
            <div className="">
                <form onSubmit={this.handleSubmit} className="w-80">
                    <h1>User Demographics</h1>
                    <div className="flex-1 items-center text-center border rounded py-2">
                        <input onChange={this.handleChange} name="passedID" className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Artist ID"></input>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                        <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                    </div>
                </form>
                {(this.state.raceData.length) ? <UserRaceTable data ={this.state.raceData}/> : <div></div>}
                {(this.state.genderData.length) ? <UserGenderTable className="my-2" data ={this.state.genderData}/> : <div></div>}
            </div>
        );
    }
}
export default UserDemographics;