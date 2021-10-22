import React from "react";
import {Link} from "react-router-dom"

class SearchButton extends React.Component{
    render(){
        return(
            <Link className="search-link" to="/search">Add book</Link>
        )
    }
}

export default SearchButton 