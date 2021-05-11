const cluster = require('cluster')
const os = require('os')
const process = require('process')
const numCpus = os.cpus().length // 获取cups的数量

console.log('numCpus,', numCpus)
var workers = {}
if (cluster.isMaster) {
    // 主进程分支
    cluster.on('death', function(worker) {
        // 当一个工作进程结束时，重启工作进程 delete workers[worker.pid],实现故障恢复
        worker = cluster.fork()
        workers[worker.pid] = worker
    })
    // 初始开启与CPU数量相同的工作进程
    for(var i = 0; i < numCpus; i++) {
        var worker = cluster.fork()
        workers[worker.pid] = worker
    }
} else {
    // 工作分支进程，启动服务器
    var app = require('./app')
    app.use(async(ctx, next) => {
        console.log('worker' + cluster.worker.id + ',PID:' + process.pid)
        next()
    })
    app.listen(3000)
}

// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function(){
    for (var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')