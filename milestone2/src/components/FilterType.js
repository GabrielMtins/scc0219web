import { useState, useEffect } from 'react';

function FilterType({ labelName, filterName, list, addFilter, filterOptions }) {
	const [selectedValue, setSelectedValue] = useState(filterOptions[filterName] || "nil");


	useEffect(() => {
		setSelectedValue(filterOptions[filterName] || "nil");
	}, [filterOptions]);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		addFilter({ [filterName.toLowerCase()]: event.target.value });
	};

	const mapItems = (item) => {
		return (<option value={item} key={item}> {item} </option>);
	};

	return (
		<div className="filter-type">
			<label htmlFor="types" className="dropdown-label"> {labelName} </label>
			<select name="types" id="filter_types" onChange={handleChange} className="dropdown-menu" value={selectedValue}>
				<option value="nil"> - </option>
				{list.map(mapItems)}
			</select>
		</div>
	);
}

export default FilterType;
