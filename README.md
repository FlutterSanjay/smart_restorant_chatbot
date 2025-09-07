
# 🍴 Restaurant AI Assistant  

## 🚀 Features  
- 🤖 AI-powered chatbot using **LangChain + Gemini**  
- 🛠️ Custom tool for fetching today's menu (`getMenu`)  
- 🌐 Express.js API endpoints (`/api/chat`, `/ask`)  
- 🎨 Simple frontend UI (`index.html`) with chat interface  
- ⚡ Fast & lightweight with structured responses  
- 🔐 `.env` file support for securing API keys  

---

## 📂 Project Structure  



.
├── public/
│   └── index.html       # Frontend UI for chatbot
├── app.js               # Main server file
├── package.json         # Dependencies & scripts
├── .env                 # Environment variables (ignored in Git)
└── README.md            # Project documentation



---

## 🔑 Requirements  

- **Node.js** >= 18  
- A **Google Generative AI API Key** (Gemini) → [Get one here](https://ai.google.dev/)  

---

## ⚙️ Installation  

1. **Clone the repository**  
   bash
   git clone https://github.com/your-username/restaurant-ai-assistant.git
   cd restaurant-ai-assistant


2. **Install dependencies**

   bash
   npm install
   

3. **Set up environment variables**
   Create a `.env` file in the root folder and add:

   
   GOOGLE_API_KEY=your_api_key_here
   PORT=3000
   

---

## ▶️ Running the Project

Start the server:

bash
npm start


Server will run at:


http://localhost:3000


Open this URL in your browser to access the chatbot UI.

---

## 📡 API Endpoints

### 1️⃣ Chat with AI (Agent + Tool)

**POST** `/api/chat`

son
{
  "input": "What's for dinner?"
}


✅ Example Response

json
{
  "output": "Veg Biryani, Raita, Salad, Gulab Jamun"
}


---

### 2️⃣ Direct Agent Testing

**POST** `/ask`

json
{
  "input": "What's for lunch?"
}




## 📜 Example Interaction

* **User:** What's on the breakfast menu?
* **Bot:** Aloo Paratha, Poha, Masala Chai

---

## 🛡️ Security Notes

* Add `.env` and `node_modules` to `.gitignore` (already done ✅)
* **Never push API keys to GitHub**. If already pushed, rotate them immediately.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss.

---

## 📄 License

This project is licensed under the MIT License.

```


