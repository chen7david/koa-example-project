global.dd = (val) => console.log(val)
const fs = require('fs')
const p = require('path')
const payload = {userId: 'US234234'}
const signOptions = { expiresIn: '14d', algorithm: 'RS256'}
const verifyOptions = { algorithms: ['RS256']}
const jwt = require('jsonwebtoken')
const private = p.resolve(__dirname, '../', 'config', 'jwt', 'private.pem')
const public = p.resolve(__dirname, '../', 'config', 'jwt', 'public.pem')
const prikey = fs.readFileSync(private, 'utf8')
const pubkey = fs.readFileSync(public, 'utf8')
const privateKey = { key: prikey, passphrase: 'mysecretkey'}
const token = jwt.sign(payload, privateKey, signOptions)
const verify = jwt.verify(token, pubkey, verifyOptions)
// 
dd({token, verify})