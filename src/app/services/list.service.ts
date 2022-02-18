import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import {deleteDoc, doc, setDoc} from "@angular/fire/firestore";
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    constructor(public afs: AngularFirestore,
                public auth: AngularFireAuth,
                private authentication: AuthenticationService) {
    }

    public getAll(): Observable<List[]> {
        if (this.authentication.getUserId() != null) {
            return this.afs.collection<List>('users/' + this.authentication.getUserId() + '/lists').valueChanges();
        }
    }

    public getOne(listId: number) {
        if (this.authentication.getUserId() != null) {
            return this.afs.doc<List>('users/' + this.authentication.getUserId() + '/lists/' + listId);
        }
    }

    public create(list: List) {
        if (this.authentication.getUserId() != null) {
            const listRef = this.afs.firestore.doc('users/'+this.authentication.getUserId());
            setDoc(doc(listRef, 'lists', list.id.toString()), {
                id: list.id,
                name: list.name
            });
        }
    }

    public createTodo(todo: Todo, listId: number) {
        if (this.authentication.getUserId() != null) {
            const todoRef = this.afs.firestore.doc('users/'+this.authentication.getUserId()+'/lists/'+listId.toString());
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
            const listRef = this.afs.firestore.doc('users/' + this.authentication.getUserId())
            deleteDoc(doc(listRef, "lists", listId.toString()));
        }
    }

    public deleteTodo(listId: number, todoId: number) {
        if (this.authentication.getUserId() != null) {
            const todoRef = this.afs.firestore.doc('users/' + this.authentication.getUserId()+'/lists/'+listId.toString())
            deleteDoc(doc(todoRef, "todos", todoId.toString()));
        }
    }
}
