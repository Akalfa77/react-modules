import React, { useState } from 'react'

export default function TaskManager() {
    const [input, setInput] = useState("")
    const [InputList, setInputList] = useState([]);

    const handleEvent = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        setInputList([...InputList, { text: input, done: false }])
        setInput("");
    }
    const toggleTask = (index) => {
        const updated = [...InputList];
        updated[index].done = !updated[index].done;
        setInputList(updated);
    };

    return (
        <div>
            <h2>Task Manager</h2>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={input}
                    onChange={handleEvent} /> <hr />
                <button>Submit</button>
            </form>

            <ul>
                {InputList.map((task, i) => (
                    <li
                        key={i}
                        onClick={() => toggleTask(i)}
                        style={{
                            textDecoration: task.done ? "line-through" : "none"
                        }}
                    >
                        {task.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
