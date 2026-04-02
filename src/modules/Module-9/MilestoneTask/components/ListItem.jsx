
export default function ListItem({ item, onSelect }) {

    console.log(`ListItem rendered: ${item.name}`);

    return (
        <div className="list-item" onClick={() => onSelect(item)}>
            <div className="item-main">
                <span className="item-name">{item.name}</span>
                {/* <span className="item-category">{item.category}</span> */}
            </div>
            <div className="item-details">
                <span className="item-price">${item.price}</span>
                <span className="item-rating">{item.rating}</span>
            </div>
        </div>
    );
}