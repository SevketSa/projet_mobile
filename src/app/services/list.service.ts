import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {combineLatest, Observable, of} from "rxjs";
import {deleteDoc, doc, setDoc} from "@angular/fire/firestore";
import {AuthenticationService} from './authentication.service';
import {combineAll, map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(public afs: AngularFirestore,
                public auth: AngularFireAuth,
                private authentication: AuthenticationService) {
    }

    public getAll(): Observable<[List[], List[]]> {
        return this.authentication.getUserId().pipe(
          switchMap(uid => {
              console.log(uid);
              const obs1 = this.afs.collection<List>('lists/', ref => ref.where('owner','==',uid)).valueChanges();
              const obs2 = this.afs.collection<List>('lists/', ref => ref.where('canWrite', 'array-contains', uid)).valueChanges();
              const obs3 = this.afs.collection<List>('lists/', ref => ref.where('canRead', 'array-contains', uid)).valueChanges();
              const write = combineLatest([obs1, obs2]).pipe(map(([a, b]) => a.concat(b)));
              return combineLatest([write,obs3]);
          })
        )
    }

    public getOne(listId: number): Observable<List> {
        return this.afs.doc<List>('lists/' + listId).valueChanges().pipe(
            switchMap(list => this.afs.collection<Todo>('lists/' + listId + '/todos').valueChanges().pipe(
                map(todos => ({
                    ...list,
                    todos
                    })
                )
            ))
        )
    }

    public getOneTodo(listId: number, todoId: number): Observable<Todo> {
        return this.afs.doc<Todo>('lists/' + listId + '/todos/' + todoId).valueChanges();
    }

    public create(list: List) {
        setDoc(doc(this.afs.firestore, 'lists', list.id.toString()), {
            id: list.id,
            name: list.name,
            owner: list.owner,
            canRead: list.canRead,
            canWrite: list.canWrite
        })
    }

    public createTodo(todo: Todo, listId: number) {
        const todoRef = this.afs.firestore.doc('lists/'+listId.toString());
        setDoc(doc(todoRef, 'todos', todo.id.toString()), {
            id: todo.id,
            name: todo.name,
            isDone: todo.isDone,
            description: todo.description
        });
    }

    public delete(listId: number) {
        deleteDoc(doc(this.afs.firestore, "lists", listId.toString()));
    }

    public deleteTodo(listId: number, todoId: number) {
        const todoRef = this.afs.firestore.doc('lists/'+listId.toString())
        deleteDoc(doc(todoRef, "todos", todoId.toString()));
    }
}
