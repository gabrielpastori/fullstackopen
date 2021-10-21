import React from 'react';

const PersonForm = ({onSubmitPerson, valueName, valueNumber, onChangeName, onChangeNumber}) => {
    return (
        <form onSubmit={onSubmitPerson}>
        <div>
          name: <input type="text" value={valueName} onChange={onChangeName} />
        </div>
        <div>
          number: <input type="text" value={valueNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default PersonForm;