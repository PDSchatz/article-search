import axios from "axios"

const baseUrl = process.env.BASE_URL
const key = process.env.NCBI_API_KEY
const keyAndRetMode = `api_key=${key}&retmode=json&`

async function getUIDsFromQuery(queryString: string){
    let UIDs = ['']
    let queryUrl = baseUrl +
                   `esearch.fcgi?` +
                   `db=pubmed&` +
                   keyAndRetMode +
                   `${queryString}`;
    let searchQueryRes = await axios({
        method: 'GET',
        url: queryUrl
    })
    if(searchQueryRes.status >= 200 && searchQueryRes.status < 300){
        let { esearchresult } = searchQueryRes.data
        if(esearchresult.ERROR){
            throw new Error(`Entrez Error: ${esearchresult.ERROR}`)
        } else if (esearchresult.warninglist) {
            let concatedError = ``
            esearchresult
                .warninglist
                .outputmessages
                .forEach((msg: any) => concatedError += `${msg} \n`)
            throw new Error(`Entrez completed the query, but returned the following errors: ${concatedError}`)
        } else {
            //at this point, we might want to consider another service handler
            //it would be recursive and would deal with the fact that the
            //number of IDs returned to us is capped at 20... so if we have hundreds of thousands,
            //how can we effectively handle that to ensure that all results are included in the final
            //doc summaries?
            UIDs = esearchresult.idlist
            return UIDs
        }
    } else {
        throw new Error(`Failed to get response from Entrez.esearch: ${searchQueryRes.data}` )
    }
}

async function getDocSumsFromUids(UIDs: Array<string>){
    const docSums = ['']
    let idString = UIDs.join(`,`)
    let sumsUrl = baseUrl +
                `esummary.fcgi?` +
                `db=pubmed` +
                keyAndRetMode +
                `id=${idString}`
    const docSumsRes = await axios({
        method: 'GET',
        url: sumsUrl
    })
    if(docSumsRes.status >= 200 && docSumsRes.status < 300){
        let { result } = docSumsRes.data
        UIDs.forEach((id: string) => {
            docSums.push(result[id])
        })
        return docSums
    } else {
        throw new Error(`Failed to get response from Entrez.esummary: ${docSumsRes.data}` )
    }
}

export default {
    getUIDsFromQuery,
    getDocSumsFromUids
}