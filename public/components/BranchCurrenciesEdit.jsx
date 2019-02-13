import React, { Component, PropTypes } from 'react';

import * as DomUtils from '../shared/dom.utils';

import BranchCurrencyEdit from './BranchCurrencyEdit';
import LanguagePicker from './LanguagePicker';

const MAX_ITEMS = 1;

let createHandlers = (ctx) => {
	let onAdd = (obj) => {
		ctx.setState((prevState) => {
			let currencies = prevState.allCurrencies;

			let newCurrency = ctx.props.availableCurrencies.find(currency => {
				return currency.CurrencyID === obj.id;
			});

			if (newCurrency) {
				if (currencies.length > 0) {
					currencies.pop();
				}
				currencies.push(newCurrency);
			}

			ctx.props.onChange('currencies', {data: currencies});

			return {
				allCurrencies: currencies
			}
		});
		// actually add that thing to the global store
	};

	let onRemove = (obj) => {
		ctx.setState((prevState) => {
			let currencies = prevState.allCurrencies.reduce((acc, current) => {
				return (current.CurrencyID !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allCurrencies);

			console.log(currencies);

			ctx.props.onChange('currencies', {data: currencies});

			return {
				allCurrencies: currencies
			}
		});
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
	};

	let onPickerItemClick = (e) => {
		// Change UI
		let rel = e.target.getAttribute('rel');
		let text = e.target.textContent;
		let id = parseInt(e.target.getAttribute('data-id'), 10);
		let target = e.target.parentNode.previousElementSibling;
		target.setAttribute('data-rel', rel);
		target.textContent = text;
		DomUtils.toggleClass(target, 'active');

		let isItemAlreadyAdded = !!ctx.state.allCurrencies.find(currency => {
			return currency.CurrencyID === id;
		});

		// If item has not been added yet, add it
		if (!isItemAlreadyAdded) {
			target.textContent = text;
			DomUtils.toggleClass(target, 'active');

			// Then add the new currency
			onAdd({
				id,
				rel,
				title: text
			});
		}
	};

	return {
		onAdd,
		onPickerBlur,
		onRemove,
		onPickerClick,
		onPickerItemClick
	};
};

class BranchCurrenciesEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCurrencies: props.currencies
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { currencies, availableCurrencies, onChange } = this.props;

		console.log(currencies);
		console.log(availableCurrencies);

		// List of all currencies availables is to retrieved dynamically from db
		const obj = {
			type: "currencies",
			items: availableCurrencies
		};

		console.log(this.state);

		const currencyComponents = (this.state.allCurrencies && this.state.allCurrencies.length > 0) ? this.state.allCurrencies.map((currency, index) => {
			return (index < this.state.allCurrencies.length - 1)
				? (
					<span key={currency.CurrencyID}>
						<BranchCurrencyEdit id={currency.CurrencyID} name={currency.Name} nameShort={currency.NameShort} symbol={currency.Symbol} description={currency.Description} onRemove={(e) => this.handlers.onRemove({id: currency.CurrencyID})} />
						,&nbsp;
					</span>
				) : (
					<span key={currency.CurrencyID}>
						<BranchCurrencyEdit id={currency.CurrencyID} name={currency.Name} nameShort={currency.NameShort} symbol={currency.Symbol} description={currency.Description} onRemove={(e) => this.handlers.onRemove({id: currency.CurrencyID})} />
					</span>
				)
		}) : null;

		return (
			<div>
				{currencyComponents}

				<div id="currency-add" className="language--add">
					<label>Add a Currency:</label>
					<div id="currency-picker" className="language--picker">
						<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
                    </div>
				</div>
			</div>
		)
	}
};

BranchCurrenciesEdit.propTypes = {
	currencies: PropTypes.array,
	availableCurrencies: PropTypes.array,
	onChange: PropTypes.func
};

export default BranchCurrenciesEdit;