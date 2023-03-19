import React from 'react';

export default function UseDetectPositionAvailable({
  refParent,
  children: Component,
  height,
  width
}) {
  if (!refParent || !Component) return;

  const trigger = refParent.current;

  // Get trigger element dimensions and position
  const triggerRect = trigger.getBoundingClientRect();
  const triggerTop = triggerRect.top;
  const triggerLeft = triggerRect.left;
  const triggerWidth = triggerRect.width;
  const triggerHeight = triggerRect.height;
  // Get tooltip element dimensions

  const tooltipWidth = width;
  const tooltipHeight = height;

  // Calculate available space around the trigger element
  const spaceTop = triggerTop;
  const spaceBottom = window.innerHeight - triggerTop - triggerHeight;
  const spaceLeft = triggerLeft;
  const spaceRight = window.innerWidth - triggerLeft - triggerWidth;

  // Determine the best position to show the tooltip
  let top, left;
  if (spaceTop >= tooltipHeight && spaceRight >= tooltipWidth) {
    console.log(1);
    top = triggerTop - tooltipHeight;
    left = 0;
  } else if (spaceTop >= tooltipHeight && spaceRight < tooltipWidth) {
    console.log(2);
    top = triggerTop - tooltipHeight;
    left = triggerWidth - tooltipWidth;
  } else if (spaceBottom >= tooltipHeight && spaceRight >= tooltipWidth) {
    console.log(3);
    top = triggerHeight + 5;
    left = 0;
  } else if (spaceBottom >= tooltipHeight && spaceRight < tooltipWidth) {
    console.log(4);
    top = triggerHeight + 5;
    left = triggerWidth - tooltipWidth;
  } else if (spaceLeft >= tooltipWidth && spaceTop >= tooltipHeight) {
    console.log(5);
    top = triggerHeight;
    left = -tooltipWidth;
  } else if (spaceLeft >= tooltipWidth && spaceTop < tooltipHeight) {
    console.log(6);
    top = 0;
    left = -tooltipWidth;
  } else if (spaceRight >= tooltipWidth && spaceTop >= tooltipHeight) {
    console.log(7);
    top = triggerHeight;
    left = triggerWidth;
  } else if (spaceRight >= tooltipWidth && spaceTop < tooltipHeight) {
    console.log(8);
    top = 0;
    left = triggerWidth;
  } else {
    // No available space, use the top position
    top = triggerTop - tooltipHeight;
    left = triggerLeft + triggerWidth / 2 - tooltipWidth / 2;
  }
  function ChildrentComponent() {
    const style = {
      left,
      top
    };
    console.log(style);
    const clones = React.Children.map(Component, (child) => {
      return React.cloneElement(child, { style });
    });
    return clones;
  }
  return <ChildrentComponent />;
}
