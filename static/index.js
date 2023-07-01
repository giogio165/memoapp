function displayMemo(memo) {
  const ul = document.querySelector("#memo_ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}]${memo.content}`;
  ul.appendChild(li);
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
      id: new Date(),
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
