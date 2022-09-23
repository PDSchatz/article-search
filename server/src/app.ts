import 'dotenv/config'
import Express from "express"
import path from "path"
import apiRouter from './controllers/apiController'

const app = Express(),
      buildPath = path.join(__dirname, '../../client/build')

app.use(Express.json())
app.use(Express.static(
        buildPath,
        {
            extensions: ["html"]
        }
    )
)
app.use('/api', apiRouter)
//Because react is an SPA, we only need to send one file :)
app.get('/', (_, res) => {
    res.status(200).sendFile(buildPath+`/index.html`)
})
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT} and also testing 2`))