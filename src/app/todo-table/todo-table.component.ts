import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface Items {
  position: number;
  name: string;
  description: string;
  date: string;
}

export const ELEMENT_DATA: Items[] = [];

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatTableModule, MatIconModule],
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent {
  @ViewChild('table', { static: true }) table!: MatTable<Items>;

  displayedColumns: string[] = ['position', 'name', 'description', 'date', 'actions'];
  dataSource = ELEMENT_DATA;

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  deleteItem(item: Items) {
    this.dataSource = this.dataSource.filter(data => data !== item);
    this.table.renderRows();
  }
}