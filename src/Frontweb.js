import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import Login from './Login';
// import { Route } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

const API_URL = " https://api.themoviedb.org/3/movie/popular?api_key=a00d4fd4b225e2adc882108fb6d69551";
// const API_SEARCH=" https://api.themoviedb.org/3/search/movie?api_key=a00d4fd4b225e2adc882108fb6d69551&query";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      })
  }, [])

 const searchMovie = async (e) => {
  e.preventDefault();
  console.log("Searching");
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a00d4fd4b225e2adc882108fb6d69551&query=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMovies(data.results);
  }
  catch (e) {
    console.log(e);
  }
}

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
        <Nav defaultActiveKey="/" as="ul">
          <Navbar.Brand href="/home">MovieDb</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbarScroll'>
          </Navbar.Toggle>

          {/* <NavLink href="/Login" style={{ color: 'red', fontSize: 20 }}>Login</NavLink> */}
          
          </Nav>
        
          <Button variant="dark" className='login-btn' href='/Login'>

            Login</Button>
          
          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg3"
              style={{ maxHeight: '100px' }}
              navbarScroll>

              <Form className='d-flex' onSubmit={searchMovie}>
                <FormControl
                  type="search"
                  placeholder='Movie Search'
                  className="me-2"
                  aria-label="search"
                  name="query"
                  value={query} onChange={changeHandler}
                  >
                </FormControl>
                <Button variant="secondary" type={"submit"}>
                  search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
      <div className="container" >
        <div className='grid'>
          {movies.map((movieReq) =>
            <MovieBox key={movieReq.id} {...movieReq} />)}
        </div>

      </div>
    </>
  );
}

export default App;

// 
// 
//
