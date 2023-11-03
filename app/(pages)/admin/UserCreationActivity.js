import React, {Component} from 'react';
import axios from "axios";
//import table


class UserCreationActivity extends Component{
    constructor(props){
        super(props);
        this.state = { fDate: '', tDate: '', data: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    }

    async handleHide(e) {
        e.preventDefault();
        this.setState({data:[]});
    }

    async handleSubmit(e){  //change to query for demographics   .. then if the input is empty return all     
        e.preventDefault();
        const FDate = this.state.fDate;
        const TDate = this.state.tDate;
        console.log(FDate);
        console.log(TDate);
        axios
            .get(`/api/reportUserCreation?from_date=${FDate}&to_date=${TDate}`)
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
                <h1>User Registration Activity</h1>
                <form onSubmit={this.handleSubmit} className="w-80">
                    <div className="flex-1 text-center border rounded py-2">
                        <div>
                            <label htmlFor="fromdate">From: </label>
                            <input onChange={this.handleChange} id="fromdate" name="fDate" className="bg-white text-black mr-1 py-1 px-2 w-36" type="date"></input>
                        </div>
                        <div>
                            <label htmlFor="todate">To: </label>
                            <input onChange={this.handleChange} id="todate" name="tDate" className="bg-white text-black mr-1 py-1 px-2 w-36 my-2" type="date"></input>
                        </div>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                        <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                    </div>
                </form>
                
            </div>
        );
    }
}
export default UserCreationActivity;