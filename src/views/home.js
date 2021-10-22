import React from "react";
import Shelves from "../components/shelves";
import SearchButton from "../components/search_button";


class Home extends React.Component{
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Shelves/>
        <div className="open-search">
          <SearchButton/>
        </div>
      </div>
    )
  }
}

export default Home