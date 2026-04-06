import { useRef, useLayoutEffect } from "react";

export default function ListItem({ index, item, style, setRowHeight }) {
    const rowRef = useRef(null);

    console.log(`ListItem rendered: ${item.name}`);

    useLayoutEffect(() => {
        if (rowRef.current) {
            const measuredHeight = rowRef.current.getBoundingClientRect().height;

            // Send measured height to parent
            setRowHeight(index, measuredHeight);
        }
    }, [index, item, setRowHeight]);


    return (
        <div className="list-item" style={style}>
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