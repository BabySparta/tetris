
export const createBoard = () => 
  Array.from(Array(20), () => 
    new Array(10).fill([0, 'clear'])
  );
