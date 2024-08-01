import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Items, TodoTableComponent } from '../todo-table/todo-table.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgFor, MatFormFieldModule, MatInputModule, MatDatepickerModule, TodoTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoTitle = 'Todo List';
  @ViewChild(TodoTableComponent) todoTable!: TodoTableComponent;

  addItem(name: string, description: string, date: string) {
    if (name && description && date) {
      const newItem: Items = {
        position: this.todoTable.dataSource.length + 1,
        name: name,
        description: description,
        date: date
      };
      this.todoTable.dataSource = [...this.todoTable.dataSource, newItem];
      this.todoTable.table.renderRows();
    } else {
      alert('Введите данные');
    }
  }
}
