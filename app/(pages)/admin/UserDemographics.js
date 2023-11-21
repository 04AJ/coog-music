import React, {Component} from 'react';
import axios from "axios";
import UserRaceTable from './tables/UserRaceTable';
import UserGenderTable from './tables/UserGenderTable';



class UserDemographics extends Component{
    constructor(props){
        super(props);
        this.state = { passedID: "", showRace:false, showGender:false, raceData:[], genderData:[], ageData:[], noData:false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({passedID: e.target.value});
    }

    async handleHide(e) {
        e.preventDefault();
        this.setState({raceData:[], genderData:[], ageData:[]});
    }

    async handleToggle(e) {
        this.setState({[e.target.name] : e.target.checked});
    }

    async handleSubmit(e){  //change to query for demographics   .. then if the input is empty return all 
        e.preventDefault();    
        const passedID = this.state.passedID;
        console.log(passedID);
        if(this.state.showRace){
            axios //RACE QUERY
                .get(`/api/reportRace?artist_id=${passedID}`)
                .then((res) => {
                    console.log(res.data);
                    this.setState({raceData:res.data});
                })
                .catch((err) => {
                    console.error("this is an error ", err);
            });
        } else {this.setState({raceData:[]})}
        if(this.state.showGender){
            axios //GENDER QUERY
                .get(`/api/reportGender?artist_id=${passedID}`)
                .then((res) => {
                    console.log(res.data);
                    this.setState({genderData:res.data});
                    if(this.state.genderData.length + this.state.raceData.length === 0){
                        this.setState({noData:true});
                    } else {this.setState({noData:false})}
                })
                .catch((err) => {
                    console.error("this is an error ", err);
            });
        } else {this.setState({genderData:[]})}
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
                        <input onChange={this.handleChange} name="passedID" className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Artist Email"></input>
                        <div className="space-x-2">
                            <label htmlFor='showRace'>Race</label>
                            <input id="showRace" type="checkbox" onChange={this.handleToggle} name="showRace" checked={this.state.showRace}/>
                            <label htmlFor='showGender'>Gender</label>
                            <input id="showGender" type="checkbox" onChange={this.handleToggle} name="showGender" checked={this.state.showGender}/>
                        </div>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                        <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>

                    </div>
                </form>
                {(this.state.raceData.length) ? <UserRaceTable data ={this.state.raceData}/> : <div></div>}
                {(this.state.genderData.length) ? <UserGenderTable className="my-2" data ={this.state.genderData}/> : <div></div>}
                {(this.state.noData === true) ? <div>no data available for this artist</div> : <div></div>}
            </div>
        );
    }
}
export default UserDemographics;