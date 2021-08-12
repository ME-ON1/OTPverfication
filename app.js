var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')


var SocketIO = require('socket.io')



/**tets action /

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*')
  res.setHeader('Access-Control-Allow-Headers','Origin, X_Requested,Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
  next();
})




app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//CORS middleware
// handling CORS policy

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);

// const io = SocketIO(server)

// let interval; 

// io.on('connection',(socket)=>{
//   console.log("user is connected")
//   if(interval){clearInterval(interval)}

//   interval = setInterval(()=> getApiEmit(socket),1000)

//   io.on("disconnection",()=>{
	  
// 	  console.log("client disconnected")
// 	  clearInterval(interval)
//   })
// })


// const getApiEmit = socket =>{
// 	const response = new Date()
// 	socket.emit("FROMAPI",response)

// }


server.listen(4000,()=>{
  console.log("server is up and running on 3000")
})
