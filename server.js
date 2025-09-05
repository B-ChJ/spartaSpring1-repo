const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>서버 정상 작동 중</h1>");
});

app.post("/lunch", (req, res) => {
    console.log("받은 데이터:", req.body);
    const menuList = [
        {
            "menu": "떡볶이",
            "Spicy": "Children",
            "Price": 4000,
            "food": "분식"
        },
        {
            "menu": "냉우동",
            "Spicy": "Baby",
            "Price": 8000,
            "food": "일식"
        },
        {
            "menu": "마라탕",
            "Spicy": "Emergency",
            "Price": 7000,
            "food": "중식"
        },
        {
            "menu": "까르보나라",
            "Spicy": "Baby",
            "Price": 12000,
            "food": "양식"
        },
        {
            "menu": "칼국수",
            "Spicy": "Children",
            "Price": 10000,
            "food": "한식"
        },
        {
            "menu": "불닭볶음면",
            "Spicy": "BulSpicy",
            "Price": 2000,
            "food": "분식"
        },
        {
            "menu": "짬뽕밥",
            "Spicy": "Spicy",
            "Price": 9500,
            "food": "중식"
        }
    ];
    const choice = menuList[Math.floor(Math.random() * menuList.length)];
    res.json({ status: "success", received: req.body, recommendation: choice });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`로컬 서버 실행 중 → http://localhost:${PORT}`);
});