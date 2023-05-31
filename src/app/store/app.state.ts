import { createAction, createReducer, on, props } from "@ngrx/store";

export interface IAppState {
  counter: number;
  item: {
    [key: string]: any;
  }
}

const localItem = localStorage.getItem('item');
const parsedItem = localItem ? JSON.parse(localItem) : null;

export const appInitialState: IAppState = {
  counter: 2,
  item: localItem ? parsedItem : []
}

export const incrementaContador = createAction('[App] Aumenta contador');
export const decrementaContador = createAction('[App] Reduz contador');
export const definirContador = createAction('[App] Define novo valor', props<{ payload: number }>());

export const adicionarNovoItem = createAction('[App] Adicionar item ', props<{ nome: string, idade: string }>());

export const appReducer = createReducer(
  appInitialState,

  on(incrementaContador, (state) => {
    state = {
      ...state,
      counter: state.counter + 1,
    }
    return state
  }),

  on(decrementaContador, (state) => {
    state = {
      ...state,
      counter: state.counter - 1,
    }
    return state
  }),

  on(adicionarNovoItem, (state, action) => {

    const novoItem = {
      nome: action.nome,
      idade: action.idade
    };

    console.log(novoItem)
    console.log('--------------------')
    console.log(state)
    const newItemArray = Array.isArray(state.item) ? state.item : [];

    localStorage.setItem('item', JSON.stringify([...newItemArray, novoItem]))

    return {
      ...state,
      item: [...newItemArray, novoItem]
    }


  })


)
