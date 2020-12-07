let http = require('http');
let fs = require('fs');
let url = require('url');

let info = require('./info');

const pageSize = 5; // 每页5条数据

// 读取数据
function read(cb) {
  fs.readFile('./data.json','utf8',function(err,data){
    if(err || data.length == 0) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}
// 写入数据
function write(data,cb) {
  fs.writeFile('./data.json',JSON.stringify(data),cb)
}

http.createServer((req,res) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.setHeader("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  if (req.method.toLowerCase() == 'options') return res.end()


  let {pathname, query} = url.parse(req.url, true); // 获取请求路径名，url参数

  if (pathname == '/info') {
    res.setHeader('Content-Type','application/json;charset=utf-8')
    res.end(JSON.stringify(info))
    return
  }
  if (pathname == '/list') {
    const id = query && parseInt(query.id)
    switch(req.method) {
      case 'GET': 
        if (!isNaN(id)) {
          read(function(data){
            let person = data.find(item => {
              return item.id == id
            })
            if (!person) person = {}
            res.setHeader('Content-Type','application/json;charset=utf-8')
            res.end(JSON.stringify(person))
          })
        } else {
          read(function(data) {
            res.end(JSON.stringify(data))
          })
        }
        break;
      case 'POST':
        let strs = '';
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', () => {
          let paramObj = JSON.parse(str);
          read(function(data){
            paramObj.id = data.length ? data[data.length-1].id+1 : 1;
            data.push(paramObj);
            write(data,function(){
              res.end(JSON.stringify({}))
            })
          })
        })
        break;
      case 'PUT':
        if (id) {
          let str = ''
          req.on('data', chunk => {
            str += chunk
          });
          req.on('end', () => {
            let paramObj = JSON.parse(str);
            read(function(data){
              data.forEach((item,i) => {
                if (item.id == id) {
                  data[i] = paramObj
                }
              })
              write(data,function(){
                res.end(JSON.stringify({}))
              })
            })
          })
        }
        
        break;
      case 'DELETE':
        read(function(data) {
          data = data.filter(item => {
            return item.id != id
          })
          write(data,function(){
            res.end(JSON.stringify({}))
          })
        })
        
        break;
    }
    
    return
  }

  if (pathname == '/page') {
    const offset = parseInt(query.page) || 0
    
    read(function(data){
      const start = pageSize*(offset-1)
      const end = pageSize*offset
      const result = data.slice(start,end)
      let hasMore = true
      if (data.length == end) {
        hasMore = false
      }
      res.setHeader('Content-Type','application/json;charset=utf-8')
      res.end(JSON.stringify({
        hasMore,
        result,
        total: data.length
      }))
    })
  }
}).listen(3000)