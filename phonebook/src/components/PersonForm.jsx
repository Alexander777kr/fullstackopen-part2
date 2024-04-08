const PersonForm = ({
  newNameValue,
  onChangeNewName,
  newPhoneNumberValue,
  onChangeNewPhoneNumber,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name:
        <input value={newNameValue} onChange={onChangeNewName} />
      </div>
      <div>
        number:
        <input value={newPhoneNumberValue} onChange={onChangeNewPhoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
