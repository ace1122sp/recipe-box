import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Loading = () => {
  return(
    <div className="loadingDoc">
      <div className="circle"></div>
    </div>
  );
}
const LandingPage = ({routing, showing}) => {
  if(!showing) return null;
  return(
    <div className="body-land">
      <div className="content-land">
        <h1>recipe box</h1>
        <div className="p"><p>create your recipe collection</p></div>
      </div>
      <div className="btn-land">
        <button onClick={routing}>get started <i className="fa fa-rocket" aria-hidden="true"></i></button>
      </div>
    </div>
  );
}
const Header = ({creRecClassOption, showing, closeAll, warningDeleteClassOption}) => {
  const ShowCRBox = () => {
    const cls = 'create-recipe-display-f';
    creRecClassOption(cls);
  }
  const showWarning = () => {
    const cls = "warning-f";
    warningDeleteClassOption(cls);
  }
  if(!showing) return null;
  return(
    <div className="header">
      <h1>Recipe box</h1>
      <div className="controls">
        <button id="deleteAllBtn" className="btn h-btns" onClick={showWarning}><i className="fa fa-trash to-shake" aria-hidden="true"></i> delete all</button>
        <button id="closeAllBtn" className="btn h-btns" onClick={closeAll}><i className="fa fa-eject to-shake" aria-hidden="true"></i> close all</button>
        <button className="btn" id="add-new" onClick={ShowCRBox}>+</button>
      </div>
    </div>
  );
}
const DeleteAllWindow = ({warningDeleteClassStatus, warningDeleteClassOption, deleteAll}) => {
  const c = ['box-alone', warningDeleteClassStatus];
  const hideWarning = () => {
    const cls = "warning-n";
    warningDeleteClassOption(cls);
  }
  const deleteChoice = () => {
    deleteAll();
    hideWarning();
  }
  return(
    <div className={c.join(" ")}>
      <div className="warning-inner">
        <h3>Are you sure you want to {'delete'} all recipes?</h3>
        <div className="answer-options">
          <button className="h-btns btn" onClick={deleteChoice}>{'delete all'}</button>
          <button className="h-btns btn" onClick={hideWarning}>no way!</button>
        </div>
      </div>
    </div>
  );
}
const EditWindow = ({checkInputValidity, editWClassOption, editWClassStatus, recipe, addToEdit, deleteIngredient, updateRecipe}) => {
  const ingredients = [...recipe.ingredients];
  const name = recipe.name;
  let ingredient;

  const updateDeletedIngredient = (index) => {
    deleteIngredient(index);
  }
  const ingredientsList = ingredients.map( (ingredient, index) =>
    <li key={index}>
      <i className="fa fa-caret-right" aria-hidden="true"></i> {ingredient}<button className="btn scaler" onClick={updateDeletedIngredient.bind(this, index)}><i className="fa fa-times" aria-hidden="true"></i></button>
    </li>
  );
  const createIngredient = (i) => {
    ingredient = i.target.value;
  }
  const updateWithNewIngredient = () => {
    if(ingredient && ingredient[0] !== ' ' && !checkInputValidity(ingredient)) {
      addToEdit(ingredient);
    } else {
      const i = document.getElementById('warnE');
      i.className = "warn-s";
      window.setTimeout(function() {
        i.className = "warn-n";
      }, 5000);
    }
    document.getElementById('addIngredient').value = '';
  }
  const done = () => {
    updateRecipe();
    editWClassOption('edit-window-display-n');
  }
  const c = ['box-alone', editWClassStatus];

  return(
    <div className={c.join(" ")}>
      <div className="inner-edit-wrap">
        <div className="edit-heading">
        <h3>{name}</h3>
        </div>
        <div className="edit-body">
        <ul>
          {ingredientsList}
        </ul>
        <input className="inp" id="addIngredient" type="text" onChange={createIngredient.bind(this)} placeholder="add new ingredient"/><input className="inp scaler" type="submit" onClick={updateWithNewIngredient} value="add" />
        </div>
        <input className="inp" type="submit" id="done-btn" value="done" onClick={done}/>
      </div>
      <div id="warnE" className="warn-n">
        <p>You can not use &,% and your input can not start {'with'} space character!</p>
      </div>
    </div>
  );
}
const Recipe = ({s, recipeBodyToggleClasses, editWClassOption, recipe, id, deleteRecipe, recipeForEdit}) => {
  const name = recipe.name;
  const ingredients = recipe.ingredients;
  const ingredientsList = ingredients.map( (ingredient, index) =>
    <li key={index}>
      <i className="fa fa-caret-right" aria-hidden="true"></i> {ingredient}
    </li>
  );
  const toggleClasses = () => {
    recipeBodyToggleClasses(id);
  }
  const handleModification = () => {
    deleteRecipe(id);
  }
  const callEditWindow = () => {
    recipeForEdit(id);
    editWClassOption('edit-window-display-f');
  }
  let classes = ['recipe-body', s];
  return(
    <div className="recipe fade-in">
      <div className="recipe-heading" onClick={toggleClasses}>
        <h3>{name}</h3>
        <button className="btn disable scaler" onClick={handleModification}><i className="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <div className={classes.join(" ")}>
        <ul>
          {ingredientsList}
        </ul>
        <button className="btn disable jumper" onClick={callEditWindow}>edit</button>
      </div>
    </div>
  );
}
const NewRecipe = ({checkInputValidity, editWClassOption, creRecClassStatus, creRecClassOption, createRecipe, counter}) => {
  let name;
  let id = counter++;
  const typeName = (i) => {
    name = i.target.value;
  }
  const showingBox = () => {
    const cls = 'create-recipe-display-n';
    creRecClassOption(cls);
    document.getElementById('newRecipeName').value = '';
  }
  const c = ['box-alone', creRecClassStatus];
  const newRecipeCreate = () => {
    if(name && name[0] !== ' ' && !checkInputValidity(name)) {
      createRecipe(name);
      document.getElementById('newRecipeName').value = '';
      showingBox();
      editWClassOption('edit-window-display-f');
    } else {
      const i = document.getElementById('warn');
      i.className = "warn-s";
      window.setTimeout(function() {
        i.className = "warn-n";
      }, 5000);
    }
  }
  return(
    <div className={c.join(" ")} >
      <div className="inner-wrap">
        <input className="inp" type="text" placeholder="New Recipe" onChange={typeName} id="newRecipeName"/><input className="inp" id="create-recipe-b" type="submit" value="create" onClick={newRecipeCreate} />
        <button className="btn scaler" onClick={showingBox}><i className="fa fa-remove" aria-hidden="true"></i></button>
      </div>
      <div id="warn" className="warn-n">
        <p>You can not use &,% and your input can not start {'with'} space character!</p>
      </div>
    </div>
  );
}
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLandingPage: true,
      showBoxPage: false,
      counter: '',
      ids: [],
      editRecipe: {
        name: '',
        ingredients: [],
        numb: ''
      },
      recipes: {},
      creRecClassStatus: 'create-recipe-display-n',
      editWClassStatus: 'edit-window-display-n',
      warningDeleteClassStatus: 'warning-n'
    };
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }
  componentDidUpdate() {
    this.handleDisablingButtons();
    this.handlingFocus();
  }
  handlingFocus() {
    let d = document.getElementById('newRecipeName');
    let ig = document.getElementById('addIngredient');
    const createShowing = this.state.creRecClassStatus;
    const editShowing = this.state.editWClassStatus;
    if(d && createShowing === 'create-recipe-display-f') {
      d.focus();
    } else if(ig && editShowing === 'edit-window-display-f') {
      ig.focus();
    }
  }
  checkDialogWindowsStatus() {
    if(this.state.creRecClassStatus === 'create-recipe-display-f' || this.state.editWClassStatus === 'edit-window-display-f' || this.state.warningDeleteClassStatus === 'warning-f') {
      return true;
    } else {
      return false;
    }
  }
  handleDisablingButtons() {
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const closeAllBtn = document.getElementById('closeAllBtn');
    const addNew = document.getElementById('add-new');
    let recipeHeadings = document.getElementsByClassName('recipe-heading');
    let disableBtns = document.getElementsByClassName('disable');
    let arr = [deleteAllBtn, closeAllBtn, addNew];
    let command;

    if(this.checkDialogWindowsStatus()) {
      command = true;
    } else {
      command = false;
    }

    let cr = recipeHeadings.length;
    let cd = disableBtns.length;

    for(let i = 0; i < cr; i++) {
      recipeHeadings[i].disabled = command;
    }

    for(let i = 0; i < cd; i++)  {
      disableBtns[i].disabled = command;
    }

    arr.forEach(b => {
      b.disabled = command;
    });
  }
  handleLoad() {
    const ld = document.getElementsByClassName('loadingDoc')[0];
    ld.style.display = 'none';
  }
  updateIdsStorage() {
    const idsString = this.state.ids.join("%");
    localStorage.setItem('_ace1122_ids', idsString);
  }
  updateRecipeToStorage(id) {
    let name = this.state.recipes[id].name;
    let ingredients = this.state.recipes[id].ingredients.join('%');
    let recipe = [];
    recipe.push(name);
    recipe.push(ingredients);
    let recipeString = recipe.join('&');
    const idd = '_ace1122_'+id.toString();
    localStorage.setItem(idd, recipeString);
    this.updateIdsStorage();
  }
  checkInputValidity(i) {
    const regex = /(%|&)/gmi;
    const result = regex.test(i);
    return result;
  }
  closeAll() {
    let i = this.state.ids;
    const count = i.length;
    const n = 'recipe-body-display-n';
    let recipes = this.state.recipes;
    for(let x = 0; x < count; x++) {
      let id = i[x];
      recipes[id].s = n;
    }
    this.setState({recipes,});
  }
  routing() {
    let counter;
    if(localStorage.getItem('_ace1122_ids') !== null && localStorage.getItem('_ace1122_ids').length > 0) {
      const getIds = localStorage.getItem('_ace1122_ids').split('%');
      let recipesObj = {};
      getIds.forEach((idd) => {
        let id = '_ace1122_'+idd.toString();
        let r = localStorage.getItem(id).split('&');
        let n = r.shift();
        let ings;
        if(r[0] !== undefined && r[0] !== "") {
          ings = r[0].split('%');
        } else {
          ings = [];
        }
        recipesObj[idd] = {
          name: n,
          ingredients: ings,
          s:'recipe-body-display-n'
        }
      });
      let ind = (getIds.length - 1);
      counter = parseInt(getIds[ind]);
      this.setState({
        ids: getIds,
        recipes: recipesObj,
        showLandingPage: false,
        showBoxPage: true,
        counter,
      });
    } else {
      counter = 0;
      this.setState({
      showLandingPage: false,
      showBoxPage: true,
      counter,
    });
    }
  }
  deleteAll() {
    this.setState({
      recipes: {},
      counter: 0,
      ids: []
    });
    localStorage.clear();
  }
  recipeBodyToggleClasses(id) {
    const s = this.state.recipes[id].s;
    let u;
    if(s === 'recipe-body-display-n') {
      u = 'recipe-body-display-f';
    } else {
      u = 'recipe-body-display-n';
    }
    const r = this.state.recipes;
    r[id].s = u;
    this.setState({recipes: r,});
  }
  creRecClassOption(cls) {
    this.setState({creRecClassStatus:cls,});
  }
  editWClassOption(cls) {
    this.setState({editWClassStatus:cls,});
  }
  warningDeleteClassOption(cls) {
    this.setState({warningDeleteClassStatus:cls,});
  }
  deleteRecipe(id) {
    const list = [...this.state.ids];
    const count = list.length;
    this.setState(() => {
      delete this.state.recipes[id];
    });
    for(let i = 0; i < count; i++) {
      if(id === list[i]) this.state.ids.splice(i, 1);
    }
    this.updateIdsStorage();
    const idd = '_ace1122_'+id.toString();
    localStorage.removeItem(idd);
  }
  listRecipes() {
    const list = this.state.ids;
    const colOne = [];
    const colTwo = [];
    const colThree = [];
    const count = list.length;
    for(let i = 0; i < count; i++) {
      if(i%3 === 0) {
        colOne.push(<Recipe key={i} id={list[i]} s={this.state.recipes[list[i]].s} recipeBodyToggleClasses={this.recipeBodyToggleClasses.bind(this)} editWClassOption={this.editWClassOption.bind(this)} recipeForEdit={this.recipeForEdit.bind(this)} recipe={this.state.recipes[list[i]]} deleteRecipe={this.deleteRecipe.bind(this)} />);
      } else if(i%3 === 1) {
        colTwo.push(<Recipe key={i} id={list[i]} s={this.state.recipes[list[i]].s} recipeBodyToggleClasses={this.recipeBodyToggleClasses.bind(this)} editWClassOption={this.editWClassOption.bind(this)} recipeForEdit={this.recipeForEdit.bind(this)} recipe={this.state.recipes[list[i]]} deleteRecipe={this.deleteRecipe.bind(this)} />);
      } else {
        colThree.push(<Recipe key={i} id={list[i]} s={this.state.recipes[list[i]].s} recipeBodyToggleClasses={this.recipeBodyToggleClasses.bind(this)} editWClassOption={this.editWClassOption.bind(this)} recipeForEdit={this.recipeForEdit.bind(this)} recipe={this.state.recipes[list[i]]} deleteRecipe={this.deleteRecipe.bind(this)} />);
      }
    }
    if(!this.state.showBoxPage) return null;
    return(
      <div className="columns">
        <div className="column col-1">{colOne}</div>
        <div className="column col-2">{colTwo}</div>
        <div className="column col-3">{colThree}</div>
      </div>
    );
  }
  recipeForEdit(e) {
    let r = this.state.recipes[e];
    this.setState({
      editRecipe: {
        name : r.name,
        ingredients: [...r.ingredients],
        numb : e
      }
    });
  }
  addToEdit(item) {
    if(this.state.editRecipe.numb) {
      const editRecipe = this.state.editRecipe;
      editRecipe.ingredients.push(item);
      this.setState({editRecipe,});
    }
  }
  createRecipe(recipeName) {
    let plusOne = this.state.counter+1;
    let updateIds = [...this.state.ids];
    updateIds.push(plusOne);
    const recs = this.state.recipes;
    recs[plusOne] = {
      name: recipeName,
      ingredients: [],
      s:'recipe-body-display-n'
    };
    this.setState({
      counter: plusOne,
      ids: [...updateIds],
      recipes: recs
    });
    this.recipeForEdit(plusOne);
    this.updateIdsStorage();
  }
  updateRecipe() {
    if(this.state.editRecipe.numb) {
      const o = this.state.editRecipe;
      const recipes = this.state.recipes;
      const editRecipe = {
        name: '',
        ingredients: [],
        numb: ''
      };
      recipes[o.numb].name = o.name;
      recipes[o.numb].ingredients = [...o.ingredients];
      this.setState({
        recipes,
        editRecipe,
      });
      this.updateRecipeToStorage(o.numb);
    } else {
      this.setState({
        editRecipe: {
          name: '',
          ingredients: [],
          numb: ''
        }
      });
    }
  }
  deleteIngredient(i) {
    const uI = this.state.editRecipe.ingredients.filter( (e, index) => {
      return index !== i;
    });
    const editRecipe = this.state.editRecipe;
    editRecipe.ingredients = uI;
    this.setState({editRecipe,})
  }
  render() {
    return(
      <div>
        <Loading />
        <LandingPage routing={this.routing.bind(this)} showing={this.state.showLandingPage} />
        <Header closeAll={this.closeAll.bind(this)} showing={this.state.showBoxPage} creRecClassOption={this.creRecClassOption.bind(this)} warningDeleteClassOption={this.warningDeleteClassOption.bind(this)} />
        <DeleteAllWindow deleteAll={this.deleteAll.bind(this)} warningDeleteClassOption={this.warningDeleteClassOption.bind(this)} warningDeleteClassStatus={this.state.warningDeleteClassStatus}/>
        <NewRecipe checkInputValidity={this.checkInputValidity.bind(this)} editWClassOption={this.editWClassOption.bind(this)} creRecClassStatus={this.state.creRecClassStatus} createRecipe={this.createRecipe.bind(this)} counter={this.state.counter} creRecClassOption={this.creRecClassOption.bind(this)}/>
        {this.listRecipes()}
        <EditWindow checkInputValidity={this.checkInputValidity.bind(this)} editWClassStatus={this.state.editWClassStatus} updateRecipe={this.updateRecipe.bind(this)} editWClassOption={this.editWClassOption.bind(this)} recipe={this.state.editRecipe} addToEdit={this.addToEdit.bind(this)} deleteIngredient={this.deleteIngredient.bind(this)} />
      </div>
    );
 }
}


ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
