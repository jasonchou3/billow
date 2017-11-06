import fs from 'fs'

export default {
    readFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err)
                    return reject(err);
                resolve(data)
            })
        })
    },


    writeFile(file, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, content, (err) => {
                if (err)
                    return reject(err);
                resolve()
            })
        })
    }
}