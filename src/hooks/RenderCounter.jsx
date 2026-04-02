import { useRef } from "react";
import './RenderCounter.css';

export default function RenderCounter({ name }) {

    const countRef = useRef(0);

    countRef.current++;

    return (
        <span className="render-counter">
            {name} rendered: <strong>{countRef.current}</strong> times
        </span>
    );
}