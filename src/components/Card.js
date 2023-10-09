function Card({index, style, eventHandler}) {
    return (
        <div 
            name="card" 
            className="col-sm-2 card"
            style={style}
            onClick={eventHandler}
            id={index}
            >&nbsp;
        </div>
    );
}

export default Card;