import React from 'react'

const Header = ({setAddToCard}: {setAddToCard: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <header>
        <h1>Dragable Cards</h1>
        <div className="buttons-content">
            <button className="btn" onClick={() => setAddToCard(true)}>Add Card</button>
        </div>
    </header>
  )
}

export default Header