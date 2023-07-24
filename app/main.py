from fastapi import FastAPI
from .models.todo import Todo
from app.db import session, Base, engine

Base.metadata.create_all(engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create")
async def create_todo(text: str, is_complete: bool = False):
    todo = Todo(text=text, completed=is_complete)
    session.add(todo)
    session.commit()
    return {"todo added": todo.text}


@app.get("/todos")
async def get_todos():
    todos_query = session.query(Todo)
    return todos_query.all()


@app.get("/done")
async def list_done_todos():
    todos_query = session.query(Todo)
    done_todos_query = todos_query.filter(Todo.completed == True)
    return done_todos_query.all()
