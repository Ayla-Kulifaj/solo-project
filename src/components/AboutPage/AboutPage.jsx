import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>  Welcome! This is my first solo project, and WOW, do I have a newfound respect for the art of creation and coding.
           The inspiration for me to want to tackle a Stock Visualization app comes from a friend who specializes in Machine Learning.
            He plans to connect a server to monitor the outcomes of his algorithm. As much as I would love to dive into the details of his work, 
            I sadly have not yet obtained the data to do so yet!   Anyhow, let me introduce you to the initial stages of my project. Thank you 
            for joining me on this journey and allowing me the opportunity to share my creation. Welcome to the bare bones of what I hope will 
            evolve into a robust tool for stock analysis!







        </p>
      </div>
    </div>
  );
}

export default AboutPage;
