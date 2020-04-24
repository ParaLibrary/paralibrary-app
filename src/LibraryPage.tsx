import React, { Component } from 'react';
import './style.css';
import { Card } from "react-bootstrap"
import {Button} from "react-bootstrap"

class App extends React.Component {
  constructor() {
    super();
      name: 'React'
    };
  }
class App extends Component {
  render() {
     return(
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
       </div>
    );
  }
}