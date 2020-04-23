import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Card } from "react-bootstrap"
import {Button} from "react-bootstrap"

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
 <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Bible</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">God</Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Visible</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Open Book</Button>
  </Card.Body>
</Card>
<br  /> <br />
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Open Book</Button>
  </Card.Body>
</Card>
       <Card body>
        <Card.Title>Special Title Treatment</Card.Title>
        <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
        <Button>Go somewhere</Button>
      </Card>
      <Card body className="text-center">
        <Card.Title>Special Title Treatment</Card.Title>
        <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
        <Button>Go somewhere</Button>
      </Card>
      <Card body className="text-right">
        <Card.Title>Special Title Treatment</Card.Title>
        <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
        <Button>Go somewhere</Button>
      </Card>
        <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Special Title Treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button>Go somewhere</Button>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
      <bk /> <bk />
      <Card>
        <Card.Header tag="h3">Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special Title Treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button>Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Footer</Card.Footer>
      </Card>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
