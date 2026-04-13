import {useState} from 'react'
import {useContext} from 'react'
import { CardsContext } from '../context/CardsContext'

type AddCardContentProps = {
    addToCard: boolean,
    setAddToCard: (addToCard: boolean) => void
}

const AddCardContent = ({ addToCard,setAddToCard }: AddCardContentProps) => {

    const { cards, setCard } = useContext(CardsContext)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleCheckDisabled = !description || !title

    const handleAddElement = () => {
        if(handleCheckDisabled) return;


        setCard([...cards, {
            id: Date.now(),
            title,
            description
        }]);
        setTitle('');
        setDescription('');
        setAddToCard(false)
    }

    
  return (
    <div className={`add-to-card ${addToCard ? 'show' : ''}`}>
        <h2>Add to card</h2>
        
        <div className="content">
            <input type="text" placeholder='add to title' className='input' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder='add to description' className='input' value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={handleAddElement} className={`btn add ${handleCheckDisabled ? 'disabled' : ''}`} disabled={handleCheckDisabled}>Add card</button>
        </div>
    </div>
  )
}

export default AddCardContent