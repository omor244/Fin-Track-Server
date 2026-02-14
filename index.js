require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = 3000 || process.env.PORT




app.use(cors())
app.use(express.json())

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1]
    console.log("fromt jwt", token)
    
   

  if (!token) return res.status(401).send({ message: 'Unauthorized Access!' })
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    // req.tokenEmail = decoded.email
    console.log(decoded)
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).send({ message: 'Unauthorized Access!', err })
  }
}

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {

    const db = client.db("FIN-TRACK")
    const usercoll = db.collection('users')
    const paymentscoll = db.collection('payments')

    try {

   
    
      

 app.post('/users', async (req, res) => {

            const data = req.body
            data.createdAt = new Date().toISOString()
            data.role = "user"

            const isexist = await usercoll.findOne({ email: data.email })
            if (isexist) {
                return res.send({ massage: "Already have this account" })
            }
            else {
                const result = await usercoll.insertOne(data)
                res.send(result)

            }

 })
        
        app.get("/users", async (req, res) => {
            const result = await usercoll.find().toArray()
            res.send(result)
        })
      

        // payment api
        app.post("/payment", async (req, res) => {
            
            const data = req.body 
            const result = await paymentscoll.insertOne(data)

            res.send(result)
        })

        app.get("/payment", async (req, res) => {
            
            const result = await paymentscoll.find().toArray()
            res.send(result)
        })
        app.patch("/payment/:id", async (req, res) => {
            const id = req.params.id 
            const data = req.body 
            const updatedDoc = {
                $set: {
                    status: data.status
                }
            }
            const query = { _id: new ObjectId(id) }
            const result = await paymentscoll.updateOne(query, updatedDoc)

            res.send(result)
        })
        app.delete("/payment/:id", async (req, res) => {
            const id = req.params.id 
            const query = { _id: new ObjectId(id) }
            const result = await paymentscoll.deleteOne(query)

            res.send(result)
        })




        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
    } finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
