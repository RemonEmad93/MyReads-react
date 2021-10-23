import React from "react";
import{Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from "../components/book";

class Search extends React.Component{
  constructor(props){
    super(props)
    this.state={
      books:[],
      results:[],
      list:""
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then((resp)=>{
      this.setState({books:resp})
    })  
  }

  updateList=function(list){
    this.setState({list: list}, this.submitSearch)
  }

  submitSearch(){
    if(this.state.list===''|| this.state.list===undefined)
    {
      return this.setState({results:[]})
    }
    BooksAPI.search(this.state.list.trim()).then(res=>{
      if(res.error){
        return this.setState({results:[]})
      }else{
        res.forEach((b)=>{
          let f =this.state.books.filter(B=>B.id ===b.id)
          if(f[0])
          {
            b.shelf=f[0].shelf;
          }
        })
        return this.setState({results:res})
      }
    })
  }

  updateBookState=(book, shelf)=>{
    BooksAPI.update(book, shelf).then(()=>{
      book.shelf = shelf;
      this.setState(state=>({
        books: state.books.filter(b=>b.id !==book.id).concat([book])
      }))
    })
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.list} onChange={(event) =>this.updateList(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
           {this.state.results.map((book,key)=> <Book updateBookState={this.updateBookState} key={key} book={book}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search