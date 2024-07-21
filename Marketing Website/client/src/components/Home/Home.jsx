import React from 'react'

const Home = ({ content }) => {
  return (
    <div>
      <h1>Marketing Website</h1>
      <ul>
      {content.map((item, index) => (
          <li key={index}>{item.title} - {item.description}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
