import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import NewsList from "../Components/NewsList";   
import {  
    Row,
    Col,   
    Navbar,  
    Nav,
    Form,
    FormControl,
    Button,
    Dropdown,
    Container,
  } from "react-bootstrap";




export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

        const [category, setCategory] = useState("");
        const [searchTerm, setSearchTerm] = useState("");

      const handleCategoryClick = (cetegory) => {
        setCategory(cetegory);
        setSearchTerm("");
      };
    
      const handleSearch = (event) => {
        event.preventDefault();
        setCategory("");
        setSearchTerm(event.target.search.value);
      };

    return(
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                  <h2> News Aggregator</h2>
                   
                </div>
                <div>
                    {user.name}
                    <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                </div>
            </header>
            <main>
            <Outlet />
            <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
        

          <Navbar.Toggle aria-controls="navbar-nav" />

          
          <Navbar.Collapse id="navbar-nav">

       

            <Nav className="me-auto">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleCategoryClick("world")}>
                    World
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("business")}
                  >
                    Business
                  </Dropdown.Item>  
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("technology")}
                  >
                    Technology
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("sports")}>
                    Sports
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("entertainment")}
                  >
                    Entertainment
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
              />

              <Button variant="outline-primary search_button" type="submit">
                Search
              </Button>
            </Form>   
          </Navbar.Collapse>  
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h5>Categories</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleCategoryClick("world")}>
                World
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("business")}>
                Business
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("technology")}>
                Technology
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("sports")}>
                Sports
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("entertainment")}>
                Entertainment
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            <NewsList category={category} searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
            </main>
            </div>
        </div>
    )
}