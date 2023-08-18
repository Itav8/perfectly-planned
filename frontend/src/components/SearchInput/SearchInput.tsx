import "./SearchInput.css"

interface SearchInputProps {
  inputValue: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputResultItems: Array<Record<string, React.ReactNode>>;
  inputResultItemClick: (
    item: Record<string, React.ReactNode>
  ) => void;
  searchInputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getInputResultItemLabel: (
    item: Record<string, React.ReactNode>
  ) => React.ReactNode;
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="search-input__container">
      <label>{props.inputLabel}</label>
      <input
        type="text"
        className="search-input__textbox"
        id="search-input"
        placeholder={props.inputPlaceholder}
        onChange={props.searchInputOnChange}
        value={props.inputValue}
      />
      <div className="search-input__items">
        {props.inputResultItems?.map((result, i) => {
          return (
            <p
              className="search-input__items--item"
              key={i}
              onClick={() => props.inputResultItemClick(result)}
            >
              {props.getInputResultItemLabel(result)}
            </p>
          );
        })}
      </div>
    </div>
  );
};
