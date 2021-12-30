const getPriorityColor = (priority) => {
  let color = "green";
  switch (priority) {
    case "priority_low":
      color = "blue";
      break;
    case "priority_high":
      color = "red";
      break;
  }

  return color;
}

export { getPriorityColor }