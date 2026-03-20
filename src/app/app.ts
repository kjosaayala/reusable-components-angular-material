import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { IReusableGrid } from '@shared/interfaces';
import { ReusableGrid } from './shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatExpansionModule, ReusableGrid, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('reusable-components-angular-material');

  readonly _openPanel = signal(false);

  dataFake = [
    {
      _id: 'USR-001',
      name: 'Amy Camelia',
      age: 29,
      city: 'Tegucigalpa',
      amountSubscription: 19.99,
      dateSubscription: '2025-01-15',
    },
    {
      _id: 'USR-002',
      name: 'Carlos Membreño',
      age: 34,
      city: 'San Pedro Sula',
      amountSubscription: 25.5,
      dateSubscription: '2025-02-10',
    },
    {
      _id: 'USR-003',
      name: 'Lucía Torres',
      age: 27,
      city: 'La Ceiba',
      amountSubscription: 12.75,
      dateSubscription: '2025-03-05',
    },
    {
      _id: 'USR-004',
      name: 'José Martínez',
      age: 41,
      city: 'Choloma',
      amountSubscription: 30.0,
      dateSubscription: '2025-01-28',
    },
    {
      _id: 'USR-005',
      name: 'Daniela Flores',
      age: 31,
      city: 'Comayagua',
      amountSubscription: 17.99,
      dateSubscription: '2025-04-12',
    },
    {
      _id: 'USR-006',
      name: 'Mario Rivera',
      age: 38,
      city: 'El Progreso',
      amountSubscription: 22.49,
      dateSubscription: '2025-02-20',
    },
    {
      _id: 'USR-007',
      name: 'Andrea Lagos',
      age: 24,
      city: 'Danlí',
      amountSubscription: 14.99,
      dateSubscription: '2025-03-17',
    },
    {
      _id: 'USR-008',
      name: 'Fernando Cruz',
      age: 45,
      city: 'Puerto Cortés',
      amountSubscription: 35.0,
      dateSubscription: '2025-01-09',
    },
    {
      _id: 'USR-009',
      name: 'Gabriela Fúnez',
      age: 26,
      city: 'Juticalpa',
      amountSubscription: 11.99,
      dateSubscription: '2025-05-01',
    },
    {
      _id: 'USR-010',
      name: 'Ricardo Mejía',
      age: 33,
      city: 'Santa Rosa de Copán',
      amountSubscription: 28.9,
      dateSubscription: '2025-02-14',
    },
    {
      _id: 'USR-011',
      name: 'Paola Hernández',
      age: 30,
      city: 'Tela',
      amountSubscription: 16.5,
      dateSubscription: '2025-03-22',
    },
    {
      _id: 'USR-012',
      name: 'Kevin Alvarado',
      age: 22,
      city: 'Siguatepeque',
      amountSubscription: 9.99,
      dateSubscription: '2025-04-03',
    },
    {
      _id: 'USR-013',
      name: 'Valeria Núñez',
      age: 36,
      city: 'Tocoa',
      amountSubscription: 21.0,
      dateSubscription: '2025-01-30',
    },
    {
      _id: 'USR-014',
      name: 'Óscar Pineda',
      age: 40,
      city: 'Catacamas',
      amountSubscription: 27.75,
      dateSubscription: '2025-05-09',
    },
    {
      _id: 'USR-015',
      name: 'María José Castro',
      age: 28,
      city: 'Villanueva',
      amountSubscription: 18.25,
      dateSubscription: '2025-02-07',
    },
    {
      _id: 'USR-016',
      name: 'Héctor Velásquez',
      age: 37,
      city: 'Choluteca',
      amountSubscription: 24.99,
      dateSubscription: '2025-03-11',
    },
    {
      _id: 'USR-017',
      name: 'Sofía Zelaya',
      age: 25,
      city: 'Yoro',
      amountSubscription: 13.49,
      dateSubscription: '2025-04-19',
    },
    {
      _id: 'USR-018',
      name: 'Luis Banegas',
      age: 43,
      city: 'Olanchito',
      amountSubscription: 31.2,
      dateSubscription: '2025-01-18',
    },
    {
      _id: 'USR-019',
      name: 'Camila Espinoza',
      age: 32,
      city: 'Gracias',
      amountSubscription: 20.0,
      dateSubscription: '2025-02-26',
    },
    {
      _id: 'USR-020',
      name: 'Javier Romero',
      age: 39,
      city: 'Intibucá',
      amountSubscription: 26.4,
      dateSubscription: '2025-03-29',
    },
    {
      _id: 'USR-021',
      name: 'Natalia Euceda',
      age: 27,
      city: 'La Lima',
      amountSubscription: 15.75,
      dateSubscription: '2025-04-07',
    },
    {
      _id: 'USR-022',
      name: 'Cristian Cáceres',
      age: 35,
      city: 'Nacaome',
      amountSubscription: 23.3,
      dateSubscription: '2025-05-13',
    },
    {
      _id: 'USR-023',
      name: 'Elena Suazo',
      age: 29,
      city: 'Trujillo',
      amountSubscription: 19.0,
      dateSubscription: '2025-01-24',
    },
    {
      _id: 'USR-024',
      name: 'Raúl Zúniga',
      age: 42,
      city: 'Roatán',
      amountSubscription: 34.99,
      dateSubscription: '2025-02-16',
    },
    {
      _id: 'USR-025',
      name: 'Isabella Ochoa',
      age: 23,
      city: 'Copán Ruinas',
      amountSubscription: 10.5,
      dateSubscription: '2025-03-08',
    },
  ];
  reusableGridSample: IReusableGrid = {
    data: [],
    columns: [
      { field: '_id', header: 'Id', fieldType: 'text' },
      { field: 'name', header: 'Name', fieldType: 'text' },
      { field: 'age', header: 'Age', fieldType: 'number' },
      { field: 'city', header: 'City', fieldType: 'text' },
      {
        field: 'amountSubscription',
        header: '$ Subscription',
        fieldType: 'currency',
        currencyCode: 'USD',
        currencyDisplay: 'symbol',
        digitsInfo: '1.2-2',
        locale: 'en-US',
      },
      { field: 'dateSubscription', header: 'Date Subscription', fieldType: 'date' },
    ],
  };

  onClickLoadData() {
    this.reusableGridSample = {
      ...this.reusableGridSample,
      data: this.dataFake,
    };
  }
}
