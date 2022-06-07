import { createServer, Model } from 'miragejs'
import { Header } from './components/Header'
import { Todos } from './components/Todos'

createServer({
  models: {
    tasks: Model
  },

  seeds(server) {
    server.db.loadData({
      tasks: [
        {
          id: "64d14df3-2709-463e-a6fa-edae722f7148",
          title: "Lorem ipsum dolor sit amet.",
          isCompleted: false,
          createdAt: new Date("2022-05-20 23:00:00")
        }
      ]
    })
  },

  routes() {
    this.namespace = "api/v1"
    this.get("/tasks")
    this.post("/tasks", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("tasks", data);
    })
  }
})

function App() {
  return (
    <>
      <Header />
      <Todos />
    </>
  )
}

export default App
