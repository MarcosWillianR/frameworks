import fs from 'fs';

type Todo = {
  id: number;
  title: string;
}

export class TodoService {
  todos: Todo[] = [];

  saveToDisk() {
    fs.writeFileSync('./service/todos.json', JSON.stringify(this.todos));
  }

  loadFromDisk() {
    try {
      const data = fs.readFileSync('./service/todos.json');
      this.todos = JSON.parse(data.toString());
    } catch (error) { }
  }

  getAll() {
    this.loadFromDisk();
    return this.todos;
  }

  add(title: string): Todo {
    this.loadFromDisk();

    const newTodo = { id: this.todos.length + 1, title };
    this.todos.push(newTodo);

    this.saveToDisk();

    return newTodo;
  }

  delete(id: number) {
    this.loadFromDisk();

    this.todos = this.todos.filter(todo => todo.id !== id);

    this.saveToDisk();
  }
}