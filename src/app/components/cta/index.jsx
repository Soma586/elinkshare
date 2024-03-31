
import './styles.scss'


const CTA = ({text, handleclick}) => {



    return (
        <button className="cta" onClick={handleclick}>
            {text}
        </button>
    )
}



export default CTA