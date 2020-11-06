import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  NavLink,
  Prompt
} from "react-router-dom";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

const Header = () => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
      <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
    </ul>
  );
}

export default function App(props) {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={props.bookFacade} />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={props.bookFacade} />
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={props.bookFacade} />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>


    </Router>
  );
}

function Home() {
  return (
    <h2>Home</h2>
  )
}

function Products(props) {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Products</h2>
      <ul>{props.bookFacade.getBooks().map(element => <li key={element.id}>{element.title} <Link to={`${url}/${element.id}`}>details</Link></li>)}</ul>
      <Switch>
        <Route exact path={path}>
          <h3>Book details for selected book will go here</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={props.bookFacade} />
        </Route>
      </Switch>

    </div>
  )

}

function AddBook(props) {
  const emptyBook = { id: "", title: "", info: "" };
  const [info, setInfo] = useState();
  const [book, setBook] = useState(emptyBook);
  const [isBlocking, setIsBlocking] = useState(false);

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setBook({ ...book, [id]: value });
    setIsBlocking(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("book: " + JSON.stringify(book));
    props.bookFacade.addBook(book);
    setIsBlocking(false);
    setBook(emptyBook);
    setInfo('Book with title: '  + book.title +  ' added to list');
  }


  return (
    <div>
      <h1>Add Book</h1>
      <form onChange={handleChange}>
        <input
          id="title"
          placeholder="Add title"
          value={book.title}
          onChange={event => {
            setIsBlocking(event.target.value.length > 0);
          }}
        />
        <br />
        <input
          id="info"
          placeholder="Add info"
          value={book.info}
          onChange={event => {
            setIsBlocking(event.target.value.length > 0);
          }}
        />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
        <p>{info}</p>
      <Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
    </div>
  )
}

function Company() {
  return (
    <h2>Company</h2>
  )
}

function NoMatch() {
  let location = useLocation();
  return (
    <p>No match for <code>{location.pathname}</code></p>
  )
}

function Details(props) {
  let { bookId } = useParams();
  console.log(bookId);

  return (
    <fieldset>
      <legend>Book detail:</legend>
      <p>
        Id:
        {props.bookFacade.findBook(bookId).id}
        <br />
        Title:
        {props.bookFacade.findBook(bookId).title}
        <br />
        Info:
        {props.bookFacade.findBook(bookId).info}
      </p>
    </fieldset>
  );
}

function FindBook(props) {
  const emptyBook = { id: "", title: "", info: "" };
  const [info, setInfo] = useState(); 
  //const [book, setBook] = useState();
  const [bookId, setBookId] = useState(emptyBook);
  const [findBookId, setFindBookId] = useState();

  const handleChange = (evt) => {
    const id = evt.target.value;
    setBookId(id);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFindBookId(bookId);
    setBookId(emptyBook);
    console.log("bookId: " + JSON.stringify(bookId));
  }

  const deleteBook = (evt) => {
    evt.preventDefault();
    const id = evt.target.value;
    console.log("delete: " + JSON.stringify(id));
    props.bookFacade.deleteBook(id);
    setInfo('Book with Id: ' + id + ' deleted');
  }

  const handleEditChange = (evt) => {
    const { id, value } = evt.target;
    setBookId({ ...bookId, [id]: value });
  }

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    console.log("EditBook: " + JSON.stringify(bookId));
    //props.bookFacade.addBook(book);
    //setBook(emptyBook);
    //setInfo('Book with title: '  + book.title +  ' added to list');
  }

  return (
    <div>
      <h2>Find Book</h2>
      <form onChange={handleChange}>
        <input
          id="id"
          placeholder="Enter book id"
          value={bookId.id}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Find book</button>
      </form>

      <fieldset>
        <legend>Book detail:</legend>
        <p>
          Id:
        {props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).id}
          <br />
        Title:
        {props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).title}
          <br />
        Info:
        {props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).info}
        </p>
        <div>{info}</div>
      </fieldset>
      
      <form>
        <button onClick={deleteBook} value={findBookId}>Delete Book</button>
      </form>

      <hr/>

      <h2>Edit Book</h2>
      <form onChange={handleEditChange}>
      <input
          id="id"
          readOnly
          value={props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).id}
          
        />
        <br />
        <input
          id="title"
          placeholder="Edit title"
          value={props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).title}
          
        />
        <br />
        <input
          id="info"
          placeholder="Edit info"
          value={props.bookFacade.findBook(findBookId) && props.bookFacade.findBook(findBookId).info}
          
        />
        <br />
        <button onClick={handleEditSubmit}>Edit Book</button>
      </form>

    </div>
  )
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
