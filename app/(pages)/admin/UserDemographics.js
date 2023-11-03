import React, {Component} from 'react';
import axios from "axios";



class UserDemographics extends Component{
    constructor(props){
        super(props);
        this.state = { passedID: "", raceData:[] }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({passedID: e.target.value});
    }

    async handleSubmit(e){  //change to query for demographics   .. then if the input is empty return all 
        e.preventDefault();    
        const passedID = this.state.passID;
        console.log(passedID);
        axios
            .get(`/api/reportDemographics?artist_id=${passedID}`)
            .then((res) => {
                console.log(res.data);
                this.setState({raceData:res.data});
            })
            .catch((err) => {
                console.error("this is an error ", err);
        });
    }

    render(){ //create multiple tables for demographic stats
        return(
            <div className="">
                <form onSubmit={this.handleSubmit} className="w-80">
                    <h1>User Demographics</h1>
                    <div className="flex-1 items-center text-center border rounded py-2">
                        <input onChange={this.handleChange} name="passedID" className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Artist ID"></input>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default UserDemographics;