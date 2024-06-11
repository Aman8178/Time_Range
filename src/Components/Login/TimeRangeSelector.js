import React, { useState, useEffect } from 'react';
import './TimeRangeSelector.css'; // Assuming you have a CSS file for styling

const TimeRangeSelector = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [excludedTimes, setExcludedTimes] = useState([]);

  useEffect(() => {
    // Example initial setup: Select time slot 2, time range from 5 to 22 excluding 13-14 and 17
    const initialSelectedTimes = [2, ...Array.from({ length: 18 }, (_, i) => i + 5)];
    const initialExcludedTimes = [13, 14, 17];
    setSelectedTimes(initialSelectedTimes);
    setExcludedTimes(initialExcludedTimes);
    console.log("Selected Times:", initialSelectedTimes);
    console.log("Excluded Times:", initialExcludedTimes);
  }, []);

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prevSelected) => {
      const alreadySelected = prevSelected.includes(time);
      const updatedSelected = alreadySelected
        ? prevSelected.filter((t) => t !== time)
        : [...prevSelected, time].sort((a, b) => a - b);
      console.log("Selected Times:", updatedSelected);
      console.log("Excluded Times:", excludedTimes);
      return updatedSelected;
    });
  };

  const toggleExcludedTime = (time) => {
    setExcludedTimes((prevExcluded) => {
      const alreadyExcluded = prevExcluded.includes(time);
      const updatedExcluded = alreadyExcluded
        ? prevExcluded.filter((t) => t !== time)
        : [...prevExcluded, time].sort((a, b) => a - b);
      console.log("Selected Times:", selectedTimes);
      console.log("Excluded Times:", updatedExcluded);
      return updatedExcluded;
    });
  };

  const renderTimeSlots = (toggleFunction, selectedArray) => {
    let slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(
        <div
          key={i}
          className={`time-slot ${selectedArray.includes(i) ? 'selected' : ''}`}
          onClick={() => toggleFunction(i)}
        >
          {i}
        </div>
      );
    }
    return slots;
  };

  return (
    <div className="container">
      <h2>Select Time Range</h2>
      <div className="time-container">
        {renderTimeSlots(toggleTimeSelection, selectedTimes)}
      </div>
      <h2>Exclude Time Slots</h2>
      <div className="time-container">
        {renderTimeSlots(toggleExcludedTime, excludedTimes)}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
