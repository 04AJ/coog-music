import React, {Component} from 'react';
import axios from "axios";
import UserCreationTable from './tables/UserCreationTable';


class UserCreationActivity extends Component{
    constructor(props){
        super(props);
        this.state = { fDate: '', tDate: '', data: [], artists:false, listeners:false };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    async handleToggle(e) {
        this.setState({[e.target.name] : e.target.checked});
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
        const ar = this.state.artists;
        const ls = this.state.listeners;
        console.log(ar);
        console.log(ls);
        if (FDate === '' && TDate === ''){
            console.log("give at least 1 date");
            return;
        }
        if (!ar && !ls){
            console.log("nothin")
            return;
        }
        axios
            .get(`/api/reportUserCreation?from_date=${FDate}&to_date=${TDate}&artists=${ar}&listeners=${ls}`)
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
                <form onSubmit={this.handleSubmit} className="w-auto">
                    <div className="flex-1 text-center border rounded py-4 border-slate-600 bg-neutral-900 ">
                        <div>
                            <label htmlFor="fromdate">From: </label>
                            <input onChange={this.handleChange} id="fromdate" name="fDate" className="bg-white text-black mr-1 py-1 px-2 w-36" type="date"></input>
                        </div>
                        <div>
                            <label htmlFor="todate">To: </label>
                            <input onChange={this.handleChange} id="todate" name="tDate" className="bg-white text-black mr-1 py-1 px-2 w-36 my-2" type="date"></input>
                        </div>
                        <div className="space-x-2">
                            <label htmlFor='artistCheck'>artists</label>
                            <input id="artistCheck" type="checkbox" onChange={this.handleToggle} name="artists" checked={this.state.artists}/>
                            <label htmlFor='listenerCheck'>listeners</label>
                            <input id="listenerCheck" type="checkbox" onChange={this.handleToggle} name="listeners" checked={this.state.listeners}/>
                        </div>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                        <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                    </div>
                </form>
                <div className="flex mb-4 justify-center space-x-8 mt-6">
                    <div className='w-1/2'>{(this.state.data.length) ? <UserCreationTable data ={this.state.data}/> : <div></div>}</div>
                </div>
            </div>
        );
    }
}
export default UserCreationActivity;