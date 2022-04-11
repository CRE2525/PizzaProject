import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { toppingData } from './data';
import { recipeData } from './data';

class Topping extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            toppingDetails: this.props.toppingDetails,
        };
    }
    render() {
        return (
            <div className='col topping'>
                <h3 className='topping-title'>{this.state.toppingDetails.name}</h3>
                <span>{this.state.toppingDetails.rating}</span>
                <div className='topping-desc'>{this.state.toppingDetails.description}</div>
            </div>
        );
    }
}

class ToppingComponent extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            toppings: toppingData,
            sortParam: '',
        };
    }

    sortToppings(searchParam, ascending) {
        let n = 1;
        ascending ? n = n*-1 : n = n*1;
        let sortedToppingsList = this.state.toppings;
        sortedToppingsList.sort(function(a, b){
            let keyA = a[searchParam];
            let keyB = b[searchParam];

            let compareResult = 0;
            keyA < keyB ? compareResult = -n : compareResult = n;
            return compareResult;
        });
        this.setState({ sortParam : searchParam });
        this.setState({ toppings : sortedToppingsList });
    }

    processToppingArray(subArrayLen) {
        let toppingsArray = [];
        let i = 0;
        while(i < this.state.toppings.length) {
            let j = 0;
            let nestedArray = []
            while(j < subArrayLen && i < this.state.toppings.length) {
                nestedArray.push(this.state.toppings[i]);
                i++;
                j++;
            }
            toppingsArray.push(nestedArray);
        }
        return toppingsArray;
    }

    render() {
        const nestedToppingList = this.processToppingArray(3);
        return (
            <div className='topping-component'>
                <div className='topping-header'><h1>Toppings for Pan Pizza</h1></div>
                <div className='topping-radio-button'>
                    Sort by:
                    <button
                        onClick={() => this.sortToppings('name', false)}
                        className={this.state.sortParam === 'name' ? 'topping-radio-button-selected' : ''}
                        type="button">
                        Name
                    </button>
                    <button 
                        onClick={() => this.sortToppings('rating', true)} 
                        className={this.state.sortParam === 'rating' ? 'topping-radio-button-selected' : ''}
                        type="button">
                        Rating
                    </button>
                </div>
                {nestedToppingList.map(function(subArray, i){
                    return(
                        <div key={i} className='row'>
                            {subArray.map(function(topping, j){
                                return <Topping key={topping.name} toppingDetails={topping}/>
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

class RecipeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemDetails: this.props.listItemDetails,
            itemClass: `${this.props.floatSide} recipe-item`,
        }
    }
    render() {
        console.log('[RecipeItem] this.state.listItemDetails = ', this.state.listItemDetails);
        return (  
            <div>
                <div className={this.state.itemClass}>
                    <div className='recipe-item-summary'>{this.state.listItemDetails.summary}</div>
                    <div className='recipe-item-desc'>{this.state.listItemDetails.description}</div>
                </div>
            </div>      
        );
    }
}

class Recipe extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            recipeItems: recipeData,
        };
    }
    render() {
        console.log('This is this.state.recipeItems ->', this.state.recipeItems);
        return (
            <div className='recipe-component'>
                <h1 className='recipe-header'>Cast Iron Pizza</h1>
                <div className='recipe-items'>
                    {this.state.recipeItems.map(function(item, i){
                        console.log('This is the loop. item=', item);
                        let floatSide = 'float-left';
                        i % 2 !== 0 ? floatSide = 'float-right' : floatSide = 'float-left';
                        return <RecipeItem key={i} floatSide={floatSide} listItemDetails={item}/>
                    })}
                </div>
            </div>
        );
    }
}

class PizzaComponent extends React.Component {
    render() {
        return (
        <div className="main">
            <Recipe />
            <ToppingComponent />
        </div>
        );
    }
}

// =================== Render =====================

ReactDOM.render(
    <PizzaComponent />,
    document.getElementById('root')
);
