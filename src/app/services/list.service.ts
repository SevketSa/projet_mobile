import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {combineLatest, Observable, of} from "rxjs";
import {deleteDoc, doc, setDoc} from "@angular/fire/firestore";
import {AuthenticationService} from './authentication.service';
import {map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(public afs: AngularFirestore,
                public auth: AngularFireAuth,
                private authentication: AuthenticationService) {
    }

    public getAll(): Observable<List[]> {//ref => ref.where('canRead', 'array-contains', this.authentication.getUserId())
        /*const obs1 = this.authentication.getUserId().pipe(
          switchMap(uid => this.afs.collection<List>('lists/', ref => ref.where('owner','==',uid)).valueChanges())
        )*/
        return this.afs.collection<List>('lists/', ref => ref.where('owner','==',this.authentication.getUserId())).valueChanges();
        //const obs2 = this.afs.collection<List>('lists/', ref => ref.where('canWrite', 'array-contains', this.authentication.getUserId())).valueChanges();
        //return combineLatest([obs1, obs2]).pipe(map(([a, b]) => a.concat(b)));
    }

    public getOne(listId: number) {
        if (this.authentication.getUserId() != null) {
            return this.afs.doc<List>('lists/' + listId);
        }
    }

    public create(list: List) {
        if (this.authentication.getUserId() != null) {
            setDoc(doc(this.afs.firestore, 'lists', list.id.toString()), {
                id: list.id,
                name: list.name,
                owner: list.owner,
                canRead: list.canRead,
                canWrite: list.canWrite
            });
        }
    }

    public createTodo(todo: Todo, listId: number) {
        if (this.authentication.getUserId() != null) {
            const todoRef = this.afs.firestore.doc('lists/'+listId.toString());
            setDoc(doc(todoRef, 'todos', todo.id.toString()), {
                id: todo.id,
                name: todo.name,
                isDone: todo.isDone,
                description: todo.description
            });
        }
    }

    public delete(listId: number) {
        if (this.authentication.getUserId() != null) {
            deleteDoc(doc(this.afs.firestore, "lists", listId.toString()));
        }
    }

    public deleteTodo(listId: number, todoId: number) {
        if (this.authentication.getUserId() != null) {
            const todoRef = this.afs.firestore.doc('lists/'+listId.toString())
            deleteDoc(doc(todoRef, "todos", todoId.toString()));
        }
    }
}
