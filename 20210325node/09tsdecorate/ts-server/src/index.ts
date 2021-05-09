import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
import { load } from './utils/decors'
import { resolve } from 'path'
import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
    port:3306,
    database:'test',
    username:'root',
    password:'admin',
    dialect:'mysql',
    modelPaths: [`${__dirname}/model`],
});

const router = load(resolve(__dirname, './routes'))

const app = new Koa()

app.use(timing())
app.use(serve(`${__dirname}/public`))

app.use(bodify({
    multipart: true
}))

// app.use((ctx: Koa.Context) => {
//     ctx.body = 'hello ts...'
// })
// console.log(router)
app.use(router.routes())

app.listen(3000)