import React from 'react';
import CheckboxTreeList from './CheckboxTreeList/CheckboxTreeList';

const pc = {
  ratinglife: { hasValue: ['ratinglife1', 'ratinglife2', 'ratinglife3'] },
  ratingquality: {
    hasValue: ['ratingquality1', 'ratingquality2', 'ratingquality3'],
  },
};

const App: React.FC = () => {
  const initialSelectedValues = ['ratinglife1', 'ratingquality'];

  return (
    <div>
      <h1>Checkbox Tree List</h1>
      <CheckboxTreeList
        data={pc}
        initialSelectedValues={initialSelectedValues}
      />
    </div>
  );
};

export default App;
