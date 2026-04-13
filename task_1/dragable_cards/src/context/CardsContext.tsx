import { createContext, useState } from "react";

export type CardType = {
    id: number,
    title: string,
    description: string
}

type CardsContextType = {
    cards: CardType[],
    setCard: React.Dispatch<React.SetStateAction<CardType[]>>,
    deleteCard?: (id: number) => void,
    reorderCards?: (fromIndex: number, toIndex: number) => void
}

export const CardsContext = createContext({
    cards: [],
    setCard: () => {},
    deleteCard: () => {},
    reorderCards: () => {}
} as CardsContextType)


const CardsProvider =({ children }: { children: React.ReactNode }) => {
    const [cards, setCard] = useState<CardType[]>([])

    const deleteCard = (id: number) => {
        setCard(prev => prev.filter(card => card.id !== id))
    }

    const reorderCards = (fromIndex: number, toIndex: number) => {
        setCard(prev => {
            const newCards = [...prev]
            const [moved] = newCards.splice(fromIndex, 1)
            newCards.splice(toIndex, 0, moved)
            return newCards
        })
    }

    return (
        <CardsContext.Provider value={{ cards, setCard, deleteCard, reorderCards }}>
            {children}
        </CardsContext.Provider>
    )
}

export default CardsProvider