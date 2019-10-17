import selection_attrs from "d3-selection-multi/src/selection/attrs";
import transition_attrs from "d3-selection-multi/src/transition/attrs";

// import selection_styles from "./src/selection/styles";
// import selection_properties from "./src/selection/properties";
// import transition_styles from "./src/transition/styles";
// selection.prototype.styles = selection_styles;
// selection.prototype.properties = selection_properties;
// transition.prototype.styles = transition_styles;

export const multiSelection = selection => {
  selection.prototype.attrs = selection_attrs;
}

export const multiTransition = transition => {
  transition.prototype.attrs = transition_attrs;
}
