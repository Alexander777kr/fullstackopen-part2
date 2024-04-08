const Filter = ({ filterValue, onChangeFilter }) => {
  return (
    <div>
      filter shown with:
      <input value={filterValue} onChange={onChangeFilter} />
    </div>
  );
};
export default Filter;
