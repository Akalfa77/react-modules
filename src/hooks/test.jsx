import { useState, useEffect } from "react";
import { generateItems } from "./data/generateItems";
import ListItem from "./components/ListItem";
import './MilestoneApp.css';

export default function MilestoneApp() {

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [counter, setCounter] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    console.log("🟡 MilestoneApp rendered");

    useEffect(() => {
        const data = generateItems();
        setItems(data);
    }, []);

    // 🔮 No useMemo here
    //    This runs on EVERY render — even when counter changes
    //    Counter has nothing to do with filtering
    //    Compiler will auto-detect: depends on [items, searchTerm]
    //    And wrap it in useMemo automatically
    //
    //    Manual fix would be:
    //    const filteredItems = useMemo(() => {
    //        return items.filter(...)
    //    }, [items, searchTerm]);
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔮 No useCallback here
    //    New function created every render
    //    Compiler will auto-detect: only uses setSearchTerm (stable)
    //    And wrap it in useCallback automatically
    //
    //    Manual fix would be:
    //    const handleSearch = useCallback((e) => {
    //        setSearchTerm(e.target.value);
    //    }, []);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // 🔮 No useCallback here
    //    New function every render → passed to 1000 ListItems
    //    Every ListItem receives new onSelect reference
    //    Every ListItem thinks "prop changed, must re-render"
    //    Compiler will auto-stabilize this reference
    //
    //    Manual fix would be:
    //    const handleSelectItem = useCallback((item) => {
    //        setSelectedItem(item);
    //    }, []);
    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    // 🔮 No useCallback here
    //    Manual fix would be:
    //    const handleCounter = useCallback(() => {
    //        setCounter(prev => prev + 1);
    //    }, []);
    const handleCounter = () => {
        setCounter(prev => prev + 1);
    };

    return (
        <div className="milestone-container">
            <h2>Milestone Task: 1000 Items</h2>

            <p className="milestone-note">
                No React.memo, No useMemo, No useCallback.
                <br />
                Click counter or type in search → watch console for 1000+ logs.
            </p>

            <div className="milestone-toolbar">
                <div className="counter-box">
                    <button className="counter-btn" onClick={handleCounter}>
                        Counter: {counter}
                    </button>
                    <span>Unrelated state — still causes 1000 re-renders!</span>
                </div>

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search 1000 items..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {selectedItem && (
                <div className="selected-info">
                    Selected: <strong>{selectedItem.name}</strong> — ${selectedItem.price} — {selectedItem.category}
                </div>
            )}

            <div className="list-header">
                <span>Showing {filteredItems.length} of {items.length} items</span>
            </div>

            {/* 🔮 Every render: 1000 ListItems re-render because
                   - No React.memo on ListItem
                   - handleSelectItem is new reference every time
                   Compiler will fix both automatically */}
            <div className="items-list">
                {filteredItems.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        onSelect={handleSelectItem}
                    />
                ))}
            </div>
        </div>
    );
}