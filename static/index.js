async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo_ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  // 수정버튼
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  // 삭제버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제하기";
  deleteBtn.addEventListener("click", deleteMemo);
  deleteBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  //초기화 해주고 append해줘야댐 readMemo에서 초기화해주기
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  //jsonRes는 배열
  const ul = document.querySelector("#memo_ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
  //forEach
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
    //body에 객체 그대로 넣으면 전달 X, JSON.stringify 꼭 해줘야해 ,통신을 할때는 문자열만 전달할수있음
  });
  const jsonRes = await res.json();
  //서버에 메모 요청 (post)
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo_input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo_form");
form.addEventListener("submit", handleSubmit);
readMemo();
