 import cors from 'cors'
const corss = cors({
		origin: "http://localhost:5173",
		methods: ["GET","POST","PUT","DELETE"],
		credentials: true,
	})
export default corss