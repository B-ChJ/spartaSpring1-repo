const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs").promises;
const path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>서버 정상 작동 중</h1>");
});

app.post("/lunch", async (req, res) => {
    try {
        const entry = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        const dataPath = path.join(__dirname, "lunchData.json");
        let allData = [];
        try {
            const content = await fs.readFile(dataPath, "utf-8");
            allData = JSON.parse(content);
        }
        /*에러 처리*/
        catch (err) {
            if (err.code !== "ENOENT") throw err;
        }

        allData.push(entry);
        /*json 파일로 저장*/
        await fs.writeFile(dataPath, JSON.stringify(allData, null, 2), "utf-8");

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

        return res.json({ status: "success", recommendation: choice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "저장 실패" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`로컬 서버 실행 중 → http://localhost:${PORT}`);
});
