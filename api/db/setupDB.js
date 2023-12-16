const connectCollection = require('./mongodb')
const { v4:uuid } = require('uuid')

const users = []

const fullFillUser = () => {
    for(let i = 0; i < 5; i++) {
        users.push({ name: `User${i}`})
    }
}

const main = async () => {
    const {collection, client} = (await connectCollection())

    fullFillUser()
    await collection.deleteMany()
    await collection.insertMany(users)
    // const vals = await collection.find().toArray()
    // vals.forEach(i => {console.log(i)})
    await client.close()
}

main()