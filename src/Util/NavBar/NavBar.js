import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from "react";

const NavBar = (props)=>{

    const nav = props.data.map(item=>{
        return(
                <Nav.Link key={item.title} onClick={() => props.setPage(item.pagetype)}>
                    {item.title}
                </Nav.Link>
        )
    })

    return(
        <Navbar className="mb-4" bg="dark" variant="dark">
        <Navbar.Brand href="https://www.gmu.edu/">
          GMU
        </Navbar.Brand>
        <Nav className="mr-auto">
          {nav}
        </Nav>
      </Navbar>
    )
}

export default NavBar;