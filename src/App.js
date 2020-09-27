import React from 'react';
import Navigation from './components/nav';
import Jumbotron from './components/jumbotron';
import Shortify from './components/shortify';

function App() {
  return (
    <>
    <Navigation />
    <Jumbotron 
      title='SHORTIFY' 
      lead='This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
      small='It uses utility classes for typography and spacing to space content out within the larger container.'
      link='#'
      buttonText='Learn more'
      />
      <Shortify />
    </>
  )
}

export default App;
