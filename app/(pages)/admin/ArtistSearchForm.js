import React, {Component} from 'react';
import axios from "axios";
import ArtistSearchTable from './ArtistSearchTable';


class ArtistSearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { passedName: "", data:[] }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleChange(e) {
        e.preventDefault();
        this.setState({passedName: e.target.value});
    }
    async handleHide(e) {
        e.preventDefault();
        this.setState({data:[]});
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
                        <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                    </div>
                </form>
                <ArtistSearchTable data={this.state.data}/>
            </div>
        );
    }
}
export default ArtistSearchForm;