import React, {Component} from 'react';
import axios from "axios";
import ArtistSearchTable from './tables/ArtistSearchTable';


class ArtistSearchForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { passedName: "", data:[] , artists:[]}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    componentDidMount(){
        this.getArtists();
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

    getArtists = () => {
        axios.get('/api/getArtists')
          .then(response => {
            // handle success
            this.setState({ artists: response.data });
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
      }

    

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="w-96">
                    <h1 className='text-center'>Search for Artist</h1>
                    <div className="flex-1 items-center text-center border rounded py-2">
                        {/* <select onChange={this.handleChange} className="bg-white text-black mr-1 py-1 px-2" name="passedName">
                            {this.state.artists.map((artist) => (
                              <option key={artist.artist_id} value={artist.artist_id}>
                                {artist.artist_name}
                              </option>
                            ))}
                        </select>
                        <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button> */}
                            <input onChange={this.handleChange} name="passedName" className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Enter artist name"></input>
                            <button type="submit" className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                            <button onClick={this.handleHide} className="bg-red-500 py-1 px-2 text-white mx-2 my-2 hover:bg-red-800">Hide Results</button>
                    </div>
                </form>
                {(this.state.data.length) ? <ArtistSearchTable data={this.state.data}/> : <div></div>}
            </div>
        );
    }
}
export default ArtistSearchForm;