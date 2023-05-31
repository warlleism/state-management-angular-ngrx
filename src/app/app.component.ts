import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, incrementaContador, decrementaContador, adicionarNovoItem, definirContador } from './store/app.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-study';
  def: string = ''
  nome: string = '';
  idade: string = '';

  constructor(private store: Store<{ app: IAppState }>) { }

  counter$ = this.store
    .select('app')
    .pipe(
      map(e => e.counter)
    )

  item$ = this.store
    .select('app')
    .pipe(
      map(e => e.item)
    )

  ngOnInit(): void {
    this.item$.subscribe(value => {
      console.log(value);
    });
  }

  definirContador(valor: string) {
    const valorTratado = parseFloat(valor)
    this.store.dispatch(definirContador({ payload: valorTratado }))
  }
  incrementaContador() {
    this.store.dispatch(incrementaContador())
  }

  decrementaContador() {
    this.store.dispatch(decrementaContador())
  }

  adicionarItem(): void {
    this.store.dispatch(adicionarNovoItem({ nome: this.nome, idade: this.idade }));
    // const localItem = localStorage.getItem('item');
    // const parsedItem = localItem ? JSON.parse(localItem) : null;
  }

}
