import React, { useEffect } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const Header = ({title, children}) => {
  useEffect(() => {
    document.title = title || 'Default header title if title attribute is empty';
  });

  return (
    <Container fluid className="" style={{padding:'0', marginBottom: "50px"}}>
      <div style={{backgroundColor: "lightblue", height: "170px"}}>
        <header>
        { children ? (
            <>
              <h1 style={{textAlign: 'center', color: 'rgb(100,20,0)', padding: '25px 0'}}>{ children }</h1>
            </>
          ) : null }
          <h3 style={{textAlign: 'center', marginBottom: '25px'}}>{title || 'Default header title if title attribute is empty'}</h3>
          {/* This is a comment in JSX */}
          
        </header>
      </div>
    </Container>
  );
}
 
export default Header;