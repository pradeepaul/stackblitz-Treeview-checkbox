import React, { useState } from 'react';

// Define the data structure
const list = {
  pc: {
    ratinglife: { hasValue: ['ratinglife'] },
    ratingquality: { hasValue: ['ratingquality'] },
  },
  mc: {
    speed: { hasValue: ['speed'] },
    capacity: { hasValue: ['capacity'] },
  },
};

// Recursive CheckboxTree component
interface CheckboxTreeProps {
  data: Record<string, any>;
  onCheckboxChange: (key: string, value: boolean) => void;
}

const CheckboxTree: React.FC<CheckboxTreeProps> = ({
  data,
  onCheckboxChange,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleExpand = (key: string) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(key)) {
        return prevExpanded.filter((k) => k !== key);
      } else {
        return [...prevExpanded, key];
      }
    });
  };

  const renderNode = (key: string, node: any) => {
    const isChecked = node.hasValue?.[0] || false;
    const isExpanded = expanded.includes(key);
    const hasChildren =
      typeof node === 'object' && Object.keys(node).length > 0;

    return (
      <div key={key}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onCheckboxChange(key, e.target.checked)}
          />
          {key}
        </label>
        {hasChildren && (
          <button onClick={() => handleExpand(key)}>
            {isExpanded ? '-' : '+'}
          </button>
        )}
        {isExpanded && hasChildren && (
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(node).map(([childKey, childNode]) =>
              renderNode(childKey, childNode)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {Object.entries(data).map(([key, node]) => renderNode(key, node))}
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (key: string, value: boolean) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: value,
    }));
  };

  return (
    <div>
      <h1>Checkbox Tree List</h1>
      <CheckboxTree data={list} onCheckboxChange={handleCheckboxChange} />
      <pre>Checked Items: {JSON.stringify(checkedItems, null, 2)}</pre>
    </div>
  );
};

export default App;
