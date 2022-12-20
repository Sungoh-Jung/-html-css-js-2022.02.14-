const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoLists = document.querySelector("#todo-lists");
const pass = "pass";

let saveTodoLists = [];
let updateTodoLists = [];

function paintLi(paintObj) {
  const liTag = document.createElement("li");
  //li에 넘겨받은 "paintobj"의 id와 todo를 다 넣어주고 lists에 li를 넣어줌
  liTag.setAttribute("id", paintObj.id);
  liTag.innerHTML = paintObj.todo;
  todoLists.appendChild(liTag);

  //li를 클릭했을 때 그걸 삭제하게끔 하기
  liTag.addEventListener("click", (event) => {
    //"saveTodoLists"와  "localStorage의 todoLists"를 각각 업데이트해줌(누른 li를 제외한 모든 것을 updateTodoLists에 넣고 이걸로 각각을 덮어씌움)
    updateTodoLists = saveTodoLists.filter(
      (obj) => obj.id !== parseInt(event.target.id)
    );
    localStorage.setItem("todoLists", JSON.stringify(updateTodoLists));
    saveTodoLists = updateTodoLists;

    //li tag 지우기
    const deleteLiTag = event.target;
    deleteLiTag.remove();
  });
}

todoForm.addEventListener("submit", (event) => {
  //새로고침 막기
  event.preventDefault();
  //입력받은 것을 변수에 저장하기
  const newTodo = todoInput.value;
  todoInput.value = "";

  // localstorage에 "저장할 배열(saveTodoLists)"을 저장하기
  saveTodoLists.push({ id: new Date().getTime(), todo: newTodo });
  localStorage.setItem("todoLists", JSON.stringify(saveTodoLists));
  //"saveTodoLists"에서 마지막에 입력받은 값을 "paintLi"에 전달하기
  paintLi(saveTodoLists[saveTodoLists.length - 1]);
});

//새로고침했을 때 localStorage의 todoLists에 값이 들어있으면 그걸 얻어서 화면에 표시하기
const getTodoLists = JSON.parse(localStorage.getItem("todoLists"));
if (getTodoLists === null) {
  pass;
} else {
  for (let i in getTodoLists) {
    paintLi(getTodoLists[i]);
  }
  //saveTodoLists는 새로고침하면 [비어있는] 상태니까, 이미 localStorage에 저장된 걸 얻어서 넣어주기
  saveTodoLists = getTodoLists;
}
