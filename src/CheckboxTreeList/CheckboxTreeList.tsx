import React, { useState } from 'react';

interface CheckboxItem {
  label: string;
  checked: boolean;
}

interface CheckboxGroup {
  parent: CheckboxItem;
  children: CheckboxItem[];
}

interface CheckboxTreeListProps {
  data: Record<string, { hasValue: string[] }>;
  initialSelectedValues: string[];
}

const CheckboxTreeList: React.FC<CheckboxTreeListProps> = ({
  data,
  initialSelectedValues,
}) => {
  const [checkboxState, setCheckboxState] = useState<CheckboxGroup[]>(() =>
    Object.keys(data).map((key) => {
      const parentCheckbox: CheckboxItem = {
        label: key,
        checked: initialSelectedValues.includes(key),
      };
      const childrenCheckboxes: CheckboxItem[] = data[key].hasValue.map(
        (value) => ({
          label: value,
          checked: initialSelectedValues.includes(value),
        })
      );
      return { parent: parentCheckbox, children: childrenCheckboxes };
    })
  );
  console.log('state', checkboxState);

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
