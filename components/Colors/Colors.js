export const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'grey',
  'black',
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
