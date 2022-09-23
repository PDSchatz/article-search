import { Router } from "express";
import apiService  from '../services/apiService'

const apiRouter = Router()

apiRouter.route('/search')
    .post(async (req, res, next) => {
        const queryString = req.body.query
        if(!queryString){
            res.status(400).json({
                message: `No query string was sent in body`
            })
        } else {
            try {
                let UIDs = await apiService.getUIDsFromQuery(queryString)
                let DocSums = await apiService.getDocSumsFromUids(UIDs)
                if(DocSums){
                    res.status(200).json(DocSums)
                }
            } catch (err){
                console.log(err)
                res.status(500).json({
                    message: err
                })
            }

        }
    })

export default apiRouter