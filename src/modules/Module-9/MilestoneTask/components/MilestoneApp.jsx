import { useState, useEffect, useRef, useCallback } from "react";
import { generateItems } from "../data/generateItems";
import ListItem from "../components/ListItem";
import './MilestoneApp.css';
import { useContainerHeight } from "../../shared/useContainerHeight";
// import { useResponsiveItemSize } from "../../shared/useResponsiveItemSize";
import { VariableSizeList } from "react-window"

export default function MilestoneApp() {

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState(0);
  // const [selectedItem, setSelectedItem] = useState(null);

  console.log("MilestoneApp rendered");

  const containerRef = useRef(null);
  const listRef = useRef(null);
  const height = useContainerHeight(containerRef)
  // const itemSize = useResponsiveItemSize()
  const rowHeights = useRef({});

  useEffect(() => {
    const data = generateItems();
    setItems(data);
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleSelectItem = (item) => {
  //   setSelectedItem(item);
  // };

  const handleCounter = () => {
    setCounter(prev => prev + 1);
  };

  const getItemSize = useCallback((index) => {
    return rowHeights.current[index] || 80;
  }, []);

  const setRowHeight = useCallback((index, size) => {
    const currentHeight = rowHeights.current[index];

    if (currentHeight !== size) {
      rowHeights.current = {
        ...rowHeights.current,
        [index]: size,
      };

      if (listRef.current) {
        listRef.current.resetAfterIndex(index);
      }
    }
  }, []);

  useEffect(() => {
    rowHeights.current = {};

    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [filteredItems]);


  return (
    <div className="milestone-container">
      <h2>Milestone Task: 1000 Items</h2>

      <div className="milestone-toolbar">
        <div className="counter-box">
          <button className="counter-btn" onClick={handleCounter}>
            Counter: {counter}
          </button>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search 1000 items..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="list-header">
        <span>
          Showing {filteredItems.length} of {items.length} items
        </span>
      </div>

      <div className="items-list" ref={containerRef}>
        <VariableSizeList
          ref={listRef}
          height={height}
          width="100%"
          itemCount={filteredItems.length}
          itemSize={getItemSize}
        >
          {({ index, style }) => {
            const item = filteredItems[index];

            if (!item) return null;

            return (
              <ListItem
                index={index}
                item={item}
                style={style}
                setRowHeight={setRowHeight}
              />
            );
          }}
        </VariableSizeList>
      </div>
    </div>
  );
}