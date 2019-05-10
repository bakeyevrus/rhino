import { useState } from 'react';

export default function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);

  const handleFormChange = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, handleFormChange];
}
