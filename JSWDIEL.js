const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); //모든 출처를 허용
app.use(express.json()); //JSON 데이터를 파싱할 수 있게
//'제출하기' 버튼을 누르면 addMenu를 비동기로 호출

document.getElementById("menuRegister").addEventListener("submit", async e => addMenu(e));

//메뉴 등록 API
async function addMenu(e) {
    //기본 폼 제출 방지
    e.preventDefault();
    //form 내용을 객체로 생성
    const form = e.target;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
        const res = await fetch("https://acc39f19-221e-4273-bfc0-0cd6039277fe.mock.pstmn.io/menuList", {
            method: form.method.toUpperCase(),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        //응답 데이터 파싱
        const data = await res.json();
        //등록이 성공한다면 메뉴명을 팝업창에 알려줌
        if (data.status === "success") {
            alert(`등록 성공: ${data.menu.menu}`);
            form.reset();
        }
        //등록 실패 시 원인을 message로 알려줌
        else {
            alert(`등록 실패: ${data.message}`);
        }
    } catch (err) {
        console.error(err);
        alert("서버 통신 실패");
    }
    }

//모든 메뉴 이름 조회
document.getElementById("fetchNames").addEventListener("click", async () => menuList());
async function menuList() {
    try {
        const res = await fetch("https://acc39f19-221e-4273-bfc0-0cd6039277fe.mock.pstmn.io/menuList");
        const { names } = await res.json();
        const ul = document.getElementById("nameList");
        ul.innerHTML = names.map(n => `<li>${n}</li>`).join("");
    } catch (err) {
        console.error(err);
        alert("메뉴 이름 조회 실패");
    }
    }

//특정 메뉴 상세 조회
document.getElementById("fetchDetail").addEventListener("click", async () => menuInfo());
async function menuInfo() {
    //입력받은 메뉴 이름 가져오기
    const name = document.getElementById("queryName").value.trim();
    //이름을 입력하지 않았을 경우
    if (!name) return alert("메뉴 이름을 입력하세요.");
    try {
        const res = await fetch(`https://acc39f19-221e-4273-bfc0-0cd6039277fe.mock.pstmn.io/menuList/${encodeURIComponent(name)}`);
        const data = await res.json();
        const pre = document.getElementById("detailArea");

        if (data.status === "success") {
            pre.textContent = JSON.stringify(data.menu, null, 2);
        }
        else {
            pre.textContent = `에러: ${data.message}`;
        }
    } catch (err) {
        console.error(err);
        alert("메뉴 상세 조회 실패");
    }
}
