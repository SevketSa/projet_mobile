import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {doc, setDoc} from "@angular/fire/firestore";
import {DocumentReference} from "rxfire/firestore/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listsRef: AngularFirestoreCollection<DocumentData>;
  userId: string;
  docRef: DocumentReference<DocumentData>;

  constructor(public afs : AngularFirestore, public auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => this.userId = user.uid);
    this.docRef = doc(this.afs.firestore, 'users/'+this.userId);
  }

  // public init() {
  //   this.lists.push(new List("List 1", null, [new Todo("Todo 1")]));
  //   this.lists.push(new List("List 2", null, [new Todo("Todo 1"), new Todo("Todo 2")]));
  //   this.lists.push(new List("List 3", null, [new Todo("Todo 1")]));
  // }

  public getAll(): Observable<List[]> {
    return this.afs.collection<List>('lists').valueChanges();
  }

  public getOne(listId: number) {
    return;// this.lists.find(list => list.id == listId);
  }

  public create(list: List) {
    setDoc(doc(this.docRef, '/lists', ''), {
      id: list.id,
      name: list.name
    }).then();
    //this.lists.push(list);
  }

  public createTodo(todo: Todo, listId: number) {
    //this.lists.find(list => list.id == listId).todos.push(todo);
  }

  public delete(listId: number) {
    //this.lists.splice(listId, 1);
  }

  public deleteTodo(listId: number, todoId: number) {
    //this.lists.find(list => list.id == listId).todos.splice(todoId, 1);
  }
}
