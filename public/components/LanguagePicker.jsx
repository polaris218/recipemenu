import React, { Component, PropTypes } from 'react';

class LanguagePicker extends Component {
	render() {
		const { onPickerClick, onPickerItemClick, onPickerBlur, data } = this.props;

		let firstItemTitle = (type => {
			switch (type) {
				case 'languages':
					return 'Choose a language...';
				case 'categories':
					return 'Choose a category...';
				case 'branches':
					return 'Choose a branch...';
				case 'cuisines':
					return 'Choose a cuisine...';
				case 'currencies':
					return 'Choose a currency...';
				default:
					return 'Choose an item...';
			}
		})(data.type);

		const options = (data.items && data.items.length > 0) ? data.items.map((item, index) => {
			let finalCode = item.CodeFull ? item.CodeFull : item.Code;
			switch (data.type) {
				case 'languages':
					return (
						<option value={finalCode} key={item.LanguageID}>{item.Name}</option>
					);
				case 'cuisines':
					return (
						<option value={item.Title} key={item.CuisineID}>{item.Title}</option>
					);
				case 'currencies':
					return (
						<option value={item.Name} key={item.CurrencyID}>{item.Name}</option>
					);
				case 'branches':
					return (
						<option value={item.Name} key={item.BranchID}>{item.Name}</option>
					);
				case 'categories':
					return (
						<option value={item.Title} key={item.CategoryStandardID}>{item.Title}</option>
					);
				default:
					return (
						<option value={item.codeFull} key={item.id}>{item.title}</option>
					);
			}
		}) : null;

		const selectOptions = (data.items && data.items.length > 0) ? data.items.map((item, index) => {
			let finalCode = item.CodeFull ? item.CodeFull : item.Code;
			switch (data.type) {
				case 'languages':
					return (
						<li data-id={item.LanguageID} rel={finalCode} onClick={(e) => onPickerItemClick(e)} key={item.LanguageID}>{item.Name}</li>
					);
				case 'cuisines':
					return (
						<li data-id={item.CuisineID} rel={item.Title} onClick={(e) => onPickerItemClick(e)} key={item.CuisineID}>{item.Title}</li>
					);
				case 'currencies':
					return (
						<li data-id={item.CurrencyID} rel={item.Name} onClick={(e) => onPickerItemClick(e)} key={item.CurrencyID}>{item.Name + ' (' + item.Symbol + ')'}</li>
					);
				case 'branches':
					return (
						<li data-id={item.BranchID} rel={item.Name} onClick={(e) => onPickerItemClick(e)} key={item.BranchID}>{item.Name}</li>
					);
				case 'categories':
					return (
						<li data-id={item.CategoryStandardID} className={item.disabled ? 'disable' : ''} rel={item.Title} onClick={(e) => !item.disabled ? onPickerItemClick(e) : null} key={item.CategoryStandardID}>{item.Title}</li>
					);
				default:
					return (
						<li data-id={item.id} rel={item.codeFull} onClick={(e) =>  onPickerItemClick(e)} key={item.id}>{item.title}</li>
					);
			}
		}) : null;

		return (
			<div tabIndex="1" className="custom-select" onBlur={(e) => onPickerBlur(e)}>
                <select id="pick--language" className="select-hidden" onChange={(e) => onAdd()}>
                	{options}
                </select>
                <div className="select--styled text--select" data-rel="en-gb" onClick={(e) => onPickerClick(e)}>{firstItemTitle}</div>
                <ul className="select--options">
                	{selectOptions}
                </ul>
            </div>
		)
	}
};

LanguagePicker.propTypes = {
	onPickerClick: PropTypes.func,
	onPickerItemClick: PropTypes.func,
	onPickerBlur: PropTypes.func,
	data: PropTypes.object
};

export default LanguagePicker;