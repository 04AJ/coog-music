import React, {Component} from 'react';


class ArtistSearchForm extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <form className="w-80">
                    <h1>artist ID search</h1>
                    <div className="flex-1 items-center text-center border rounded py-2">
                        <input className="bg-white text-black mr-1 py-1 px-2" type="text" placeholder="Enter artist name"></input>
                        <button className="bg-red-500 py-1 px-2 text-white hover:bg-red-800">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default ArtistSearchForm;