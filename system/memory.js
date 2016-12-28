

//在Node中通过js使用内存时就会发现只能使用部分内存（64位系统下约为1.4gb， 32位约为0.7gb）
//正常的js执行中， 无法立即回收的内存有闭包和全局变量引用这两种情况。由于V8内存限制，要十分小心此类变量是否无限增加， 因为它会导致老生代中的对象增多


//process.memoryUsage() 可以看内存使用情况，除此外， os模块中的totalMem() 和 freemem（）方法也可以查看内存使用情况（os.totalmem() and os.freemem()用于查看操作系统的内存使用情况，以字节为单位）
//rss： resident set size, 即进程的常驻内存部分。 进程的内存总共有几部分，一部分是rss， 其余部分在交换区（swap）或者文件系统（system）中。
//除了rss外，heapTotal 和heapUsed 对应的是V8的堆内存信息。 heapTotal 是堆中总共申请的内存量， heapUsed表示目前堆中使用中的内存量。 这三个值单位都是字节

//node 的内存构成主要由通过V8进行分配的部分和Node自行分配的部分。 受V8的垃圾回收限制的主要是V8的堆内存
//内存泄漏的情况不尽相同，但实质只有一个，就是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象，通常造成内存泄漏的原因如下：
//1，缓存， 2， 队列消费不及时 3， 作用域未释放

'use strict';
let showMem = function(){
  let mem = process.memoryUsage();
  let format = function(bytes){
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };
  console.log(`Process: heapTotal + ${format(mem.heapTotal)} + ' heapUsed' ${format(mem.heapUsed)} ' rss(resident set size) ' ${format(mem.rss)}`);

  console.log('------------------------------------------------');
};


let useMem = function(){
  let size = 20 * 1024 * 1024;
  let arr = new Array(size);
  for(let i=0;i<size; i++){
    arr[i] = 0;
  }
  return arr;
};

let total = [];

for(let j=0;j<15;j++){
  showMem();
  total.push(useMem());
}

showMem();