import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from "react";

const NavBar = (props)=>{

    let nav = props.data.map(item=>{
        return(
                <Nav.Link key={item.title} onClick={() => props.setPage(item.pagetype)}>
                    {item.title}
                </Nav.Link>
        )
    });

    const logout= ()=>{
      console.log("Hello Logout");
    }

    return(
        <Navbar className="mb-4" bg="dark" variant="dark">
        <Navbar.Brand href="https://www.gmu.edu/">
          GMU
        </Navbar.Brand>
        <Nav className="mr-auto">
          {nav}
        <Nav.Link onClick={props.logoutHandler}>LogOut
        </Nav.Link>
        </Nav>
      </Navbar>)
    
}

export default NavBar;