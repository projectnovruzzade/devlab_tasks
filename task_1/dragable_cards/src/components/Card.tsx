import type { CSSProperties } from 'react'
import type { CardType } from "../context/CardsContext"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = {
    onDeleteItem: () => void
} & CardType

const Card = ({ title, description, onDeleteItem, id }: CardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 10 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`card-item ${isDragging ? 'dragging' : ''}`}
            {...attributes}
            {...listeners}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <button
                className="btn remove"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={onDeleteItem}
            >
                Delete
            </button>
        </div>
    )
}

export default Card
