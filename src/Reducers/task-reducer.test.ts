import React from "react";
import { useStateToDoListType } from "../App";
import { v1 } from "uuid";
import {
  addTaskActionCreator,
  changeCheckBoxStatusActionCreator,
  removeTaskActionCreator,
  taskReducer,
} from "./task-reducer";

test("Task should be removed", () => {
  const initialTasks: useStateToDoListType = {
    ["toDoListId_1"]: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Node", isDone: false },
      { id: "5", title: "Hooks", isDone: true },
      { id: "6", title: "State", isDone: false },
    ],
    ["toDoListId_2"]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "Beer", isDone: false },
      { id: "4", title: "Cucumber", isDone: false },
      { id: "5", title: "Salt", isDone: true },
      { id: "6", title: "Sugar", isDone: false },
    ],
  };

  const result = taskReducer(
    initialTasks,
    removeTaskActionCreator("4", "toDoListId_2")
  );

  expect(result["toDoListId_2"].length).toBe(5);
  expect(result["toDoListId_1"].length).toBe(6);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
  expect(initialTasks["toDoListId_1"].length).toBe(6);
  expect(result["toDoListId_2"][3].id).toBe("5");
});

test("CheckBoxStatus should be changed", () => {
  const initialTasks: useStateToDoListType = {
    ["toDoListId_1"]: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Node", isDone: false },
      { id: "5", title: "Hooks", isDone: true },
      { id: "6", title: "State", isDone: false },
    ],
    ["toDoListId_2"]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "Beer", isDone: false },
      { id: "4", title: "Cucumber", isDone: false },
      { id: "5", title: "Salt", isDone: true },
      { id: "6", title: "Sugar", isDone: false },
    ],
  };

  const result = taskReducer(
    initialTasks,
    changeCheckBoxStatusActionCreator("2", false, "toDoListId_2")
  );

  expect(result["toDoListId_2"][1].isDone).toBe(false);
  expect(initialTasks["toDoListId_2"][1].isDone).toBe(true);
  expect(result["toDoListId_2"].length).toBe(6);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
});

test("Task  should be added", () => {
  const initialTasks: useStateToDoListType = {
    ["toDoListId_1"]: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Node", isDone: false },
      { id: "5", title: "Hooks", isDone: true },
      { id: "6", title: "State", isDone: false },
    ],
    ["toDoListId_2"]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "Beer", isDone: false },
      { id: "4", title: "Cucumber", isDone: false },
      { id: "5", title: "Salt", isDone: true },
      { id: "6", title: "Sugar", isDone: false },
    ],
  };

  const result = taskReducer(
    initialTasks,
    addTaskActionCreator("new title string", "toDoListId_2")
  );

  expect(result["toDoListId_2"].length).toBe(7);
  expect(initialTasks["toDoListId_2"].length).toBe(6);
  expect(result["toDoListId_1"].length).toBe(6);
  expect(initialTasks["toDoListId_1"].length).toBe(6);
  expect(result["toDoListId_2"][0].title).toBe("new title string");
});
