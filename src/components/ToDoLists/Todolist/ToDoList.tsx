import { useCallback, useEffect } from "react";
import s from "./ToDoList.module.css";
import { AddItemForm } from "../../AddItemForm/AddItemForm";
import { EditableSpan } from "../../EditableSpan/EditableSpan";
import { Button, List, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { Task } from "../../task/Task";

import { TaskStatuses, taskType } from "../../../api/todolist-api";
import { useDispatch } from "react-redux";
import { setTasksTC } from "../../../Reducers/task-reducer";

import { AppDispatchType } from "../../../store/Store";
import { RequestStatusType } from "../../../Reducers/app-reducer";

export type filterType = "all" | "active" | "completed";
type DoToListPropType = {
  toDoListId: string;
  title: string;
  tasks: Array<taskType>;
  removeTask: (id: string, toDoListId: string) => void;
  changeFilter: (status: filterType, toDoListId: string) => void;
  addTask: (title: string, toDoListId: string) => void;
  changeCheckBoxStatus: (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => void;
  filter: filterType;
  deleteToDoList: (toDoListId: string) => void;
  changeTaskTitle: (id: string, title: string, toDoListId: string) => void;
  changeHeadderTitle: (title: string, toDoListId: string) => void;
  entityStatus: RequestStatusType;
};

const ToDoList = React.memo((props: DoToListPropType): JSX.Element => {
  let styleForDoTolist = "ToDoList1";
  let tasks = props.tasks;
  const dispatch: AppDispatchType = useDispatch();
  useEffect(() => {
    dispatch(setTasksTC(props.toDoListId));
  }, []);

  if (props.filter === "active") {
    tasks = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasks = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  const addTaskButtonHandler = useCallback(
    (title: string): void => {
      props.addTask(title, props.toDoListId);
    },
    [props.addTask, props.toDoListId]
  );

  const onClickAllHandler = useCallback((): void => {
    props.changeFilter("all", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const onClickActiveHandler = useCallback((): void => {
    props.changeFilter("active", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const onClickCompletedHandler = useCallback((): void => {
    props.changeFilter("completed", props.toDoListId);
  }, [props.changeFilter, props.toDoListId]);

  const deleteToDoListHandler = useCallback(() => {
    props.deleteToDoList(props.toDoListId);
  }, [props.toDoListId, props.changeFilter]);

  const changeHeadderTitle = useCallback(
    (title: string) => {
      props.changeHeadderTitle(title, props.toDoListId);
    },
    [props.toDoListId, props.changeHeadderTitle]
  );

  const changeTaskTitle = useCallback(
    (title: string, id: string) => {
      props.changeTaskTitle(id, title, props.toDoListId);
    },
    [props.toDoListId]
  );

  const removeButtonHandler = useCallback(
    (id: string) => {
      props.removeTask(id, props.toDoListId);
    },
    [props.removeTask, props.toDoListId]
  );

  const changeCheckBoxStatus = useCallback(
    (id: string, checked: boolean) => {
      props.changeCheckBoxStatus(id, checked, props.toDoListId);
    },
    [props.changeCheckBoxStatus, props.toDoListId]
  );

  return (
    <div className={styleForDoTolist}>
      <Typography
        fontWeight={700}
        sx={{ marginBottom: "15px" }}
        align="center"
        variant="h5"
      >
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <EditableSpan
            addItem={changeHeadderTitle}
            title={props.title}
            disabled={props.entityStatus === "loading"}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ marginLeft: "10px" }}
            onClick={deleteToDoListHandler}
            disabled={props.entityStatus === "loading"}
          >
            del <DeleteForeverIcon />
          </Button>
        </div>
      </Typography>
      <AddItemForm
        addItem={addTaskButtonHandler}
        disabled={props.entityStatus === "loading"}
      />

      <List>
        {tasks.map((t) => {
          return (
            <Task
              key={t.id}
              task={t}
              removeButtonHandler={removeButtonHandler}
              changeCheckBoxStatus={changeCheckBoxStatus}
              changeTaskTitle={changeTaskTitle}
              disabled={props.entityStatus === "loading"}
            />
          );
        })}
      </List>
      <div className={s.item}>
        <ButtonWithMemo
          color={props.filter === "all" ? "secondary" : "primary"}
          title={"All"}
          onClick={onClickAllHandler}
        />

        <ButtonWithMemo
          color={props.filter === "active" ? "secondary" : "primary"}
          title={"Active"}
          onClick={onClickActiveHandler}
        />

        <ButtonWithMemo
          color={props.filter === "completed" ? "secondary" : "primary"}
          title={"Completed"}
          onClick={onClickCompletedHandler}
        />
      </div>
    </div>
  );
});
export { ToDoList };

type ButtonWithMemoPropsType = {
  title: string;

  onClick: () => void;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
const ButtonWithMemo = React.memo((props: ButtonWithMemoPropsType) => {
  const onclickHandler = useCallback(() => {
    props.onClick();
  }, []);

  return (
    <Button
      disableElevation
      variant="contained"
      size="small"
      color={props.color}
      onClick={onclickHandler}
    >
      {props.title}
    </Button>
  );
});
