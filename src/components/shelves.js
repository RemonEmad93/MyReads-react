import React from "react";
import * as BooksAPI from '../BooksAPI'
import Shelf from './shelf'


class Shelves extends React.Component{

    constructor(props){
        super(props)
        this.state={
            books:[]
        }
    }

    componentDidMount(){
      BooksAPI.getAll().then((resp)=>{
          this.setState({books:resp})
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
            <div className="list-books-content">
              <div>
                <Shelf updateBookState={this.updateBookState} name="Currently Reading" books={this.state.books.filter(b => b.shelf=== "currentlyReading")}/>
                <Shelf updateBookState={this.updateBookState} name="Want To Read" books={this.state.books.filter(b => b.shelf=== "wantToRead")}/>
                <Shelf updateBookState={this.updateBookState} name="Read" books={this.state.books.filter(b => b.shelf=== "read")}/>
              </div>
            </div>
        )
    }
}

export default Shelves