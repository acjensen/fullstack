'use client';

import CytoscapeComponent from 'react-cytoscapejs';

// data flows two ways --
//   1. (backward) structural subtyping / puzzle fitting
//      automatically joins by name or interface shape
//      similar to bazel, or go subtyping
//      aka give something an attribute -> it snaps into place or is labelled as
//         such because of that attribute
//      example: square->shape circle->shape => shapes -> [square, circle]
//   2. (forward) explicitly bind types
//      example: shapes -> [square, circle]

export default function Page() {
  const elements = [
    { data: { id: 'one', label: 'Node 1', parent: 'three' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2', parent: 'three' }, position: { x: 100, y: 0 } },
    { data: { id: 'three', label: 'Node 3' }, position: { x: 100, y: 0 } },
    { data: { id: 'four', label: 'Node 4' }, position: { x: 100, y: 0 } },
    { data: { id: 'five', label: 'Node 5', parent: 'four' }, position: { x: 100, y: 0 } },
    {
      data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' },
    },
    { data: { source: 'three', target: 'four', label: 'Edge from Node3 to Node4' } },
    { data: { source: 'two', target: 'five', label: 'Edge from Node2 to Node5' } },
  ];
  return (
    <div className="size-full">
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        style={{ width: '100vw', height: '100vh' }}
        className="label:data(weight)"
        cy={(cy) => {
          if (localStorage.getItem('cyjson')) {
            cy.json(JSON.parse(localStorage.getItem('cyjson')!));
          }
          localStorage.setItem('cyjson', JSON.stringify(cy.json()));

          cy.on('click', () => {
            console.log('Hello');
            localStorage.setItem('cyjson', JSON.stringify(cy.json()));
          });

          cy.center();
        }}
      />
    </div>
  );
}
