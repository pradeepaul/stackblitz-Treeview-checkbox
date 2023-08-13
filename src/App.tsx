import React, { useState } from 'react';

const pc = {
  ratinglife: { hasValue: ['ratinglife1', 'ratinglife2', 'ratinglife3'] },
  ratingquality: { hasValue: ['ratingquality'] },
};

interface CheckboxItem {
  label: string;
  checked: boolean;
}

interface CheckboxGroup {
  parent: CheckboxItem;
  children: CheckboxItem[];
}

const CheckboxTreeList: React.FC = () => {
  const [checkboxState, setCheckboxState] = useState<CheckboxGroup[]>(() =>
    Object.keys(pc).map((key) => {
      const parentCheckbox: CheckboxItem = { label: key, checked: false };
      const childrenCheckboxes: CheckboxItem[] = pc[key].hasValue.map(
        (value) => ({
          label: value,
          checked: false,
        })
      );
      return { parent: parentCheckbox, children: childrenCheckboxes };
    })
  );

  // Function to set initial pre-selected data
  const setPreSelectedData = () => {
    // Example: Pre-select 'ratinglife1' and 'ratingquality'
    const newCheckboxState = [...checkboxState];
    newCheckboxState[0].children[0].checked = true; // Pre-select 'ratinglife1'
    newCheckboxState[1].parent.checked = true; // Pre-select 'ratingquality'
    setCheckboxState(newCheckboxState);
  };

  const handleParentCheckboxChange = (parentIndex: number) => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[parentIndex].parent.checked =
      !newCheckboxState[parentIndex].parent.checked;

    newCheckboxState[parentIndex].children.forEach((child) => {
      child.checked = newCheckboxState[parentIndex].parent.checked;
    });

    setCheckboxState(newCheckboxState);
  };

  const handleChildCheckboxChange = (
    parentIndex: number,
    childIndex: number
  ) => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[parentIndex].children[childIndex].checked =
      !newCheckboxState[parentIndex].children[childIndex].checked;

    const allChildrenSelected = newCheckboxState[parentIndex].children.every(
      (child) => child.checked
    );
    const anyChildSelected = newCheckboxState[parentIndex].children.some(
      (child) => child.checked
    );

    newCheckboxState[parentIndex].parent.checked = allChildrenSelected;
    newCheckboxState[parentIndex].parent.indeterminate =
      anyChildSelected && !allChildrenSelected;

    setCheckboxState(newCheckboxState);
  };

  // Set the pre-selected data on component mount
  React.useEffect(() => {
    setPreSelectedData();
  }, []);

  return (
    <div>
      {checkboxState.map((group, parentIndex) => (
        <div key={group.parent.label}>
          <label>
            <input
              type="checkbox"
              checked={group.parent.checked}
              onChange={() => handleParentCheckboxChange(parentIndex)}
              ref={(el) => {
                if (el) {
                  el.indeterminate = group.parent.indeterminate;
                }
              }}
            />
            {group.parent.label}
          </label>
          {group.children.map((child, childIndex) => (
            <div key={child.label}>
              <label>
                <input
                  type="checkbox"
                  checked={child.checked}
                  onChange={() =>
                    handleChildCheckboxChange(parentIndex, childIndex)
                  }
                />
                {child.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckboxTreeList;
