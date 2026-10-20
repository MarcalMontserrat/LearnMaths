export const supportsGuidedNotebook = (question) =>
  ['sum', 'sub', 'mul2', 'mul3', 'mulLong', 'mul33', 'div1'].includes(
    question.type
  );

export const buildNotebookDescription = (question) => {
  if (question.type === 'sum') {
    return 'Empieza por las unidades, apunta arriba la llevada y abajo el numero que escribes en cada columna.';
  }

  if (question.type === 'sub') {
    return 'Cuando una columna no puede, quita 1 a la columna de la izquierda y reescribe arriba como queda el numero antes de restar.';
  }

  if (question.type === 'div1') {
    return 'Sigue cuatro movimientos: divide, multiplica, resta y baja. Como es exacta, debes terminar con resto 0.';
  }

  if (question.type === 'mulLong' || question.type === 'mul33') {
    return 'Haz una fila por cada cifra del numero de abajo. Si esa cifra vale decenas o centenas, desplaza la fila y al final suma todo.';
  }

  return `Multiplica de derecha a izquierda por ${question.right}. Si te llevas algo, apuntalo arriba en la siguiente columna.`;
};
