import './App.css'
import { useState, useContext } from 'react'
import Header from './components/Header'
import AddCardContent from './components/AddCardContent'
import Card from './components/Card'
import { CardsContext } from './context/CardsContext'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

function App() {

  const [addToCard, setAddToCard] = useState<boolean>(false)
  const { cards, deleteCard, reorderCards } = useContext(CardsContext)!

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return

    const fromIndex = cards.findIndex((card) => card.id === active.id)
    const toIndex = cards.findIndex((card) => card.id === over.id)

    if (fromIndex === -1 || toIndex === -1) return
    reorderCards?.(fromIndex, toIndex)
  }

  return (
    <section id="app">
      <div className="container">
        <Header setAddToCard={setAddToCard} />
        <AddCardContent addToCard={addToCard} setAddToCard={setAddToCard} />
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
            <div className="card-container">
              {
                cards.length > 0 ? (
                  cards.map((card) => (
                    <Card
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      description={card.description}
                      onDeleteItem={() => deleteCard && deleteCard(card.id)}
                    />
                  ))
                ) : (
                  <p className='no-item'>No cards to display</p>
                )
              }
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  )
}

export default App
