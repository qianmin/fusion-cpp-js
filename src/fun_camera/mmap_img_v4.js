const node_mmap = require('../../Napi/qmnode_mmap.node');
const fs = require("fs");
const cv = require("../lib/opencv340");
const path = require("path");



//创建一个隐藏的canvas用于保存真实数据
var hiden_canvas = document.createElement('canvas');
hiden_canvas.id     = "hidden_canvas";
hiden_canvas.width  = 1920;
hiden_canvas.height = 1080;
hiden_canvas.hidden=true;
hiden_canvas.style.borderStyle="dashed"
document.body.appendChild(hiden_canvas);


function draw_canvas(canvas_id,img_data)
{
    //img_data  可以使 Image对象  也可以时其它canvas  也可以是video。。。
    //显示ui
    var mycv = document.getElementById(canvas_id);
    var myctx = mycv.getContext("2d");
    myctx.drawImage(img_data,0,0,mycv.width,mycv.height);
}

Vue.createApp({
    data() {
        return {
            btn_name: "获取共享内存 内容",
            mmap_content:"暂无"
        }
    },
    methods: {
//1加载本地图片
        select_change(event) {
            console.log("select change")
            var filename=document.getElementById('image_uploads').files[0].name
            console.log(filename)

            var input = document.getElementById("image_uploads");
            var fReader = new FileReader();
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function(event){
                // console.log(event.target.result)
                var beauty = new Image();
                beauty.src = event.target.result

                beauty.onload = function(){
                    //显示ui
                    draw_canvas("id_canvas1",beauty)
                    //显示真实数据
                    draw_canvas("hidden_canvas",beauty)

                }
                beauty.onerror = function(){
                    window.alert('加载失败，请重试');
                }
            }
        },

//2写入mmap图片
        btn_write_mmp(event) {

            let mat = cv.imread("hidden_canvas");
            let ss_jpeg=new cv.Mat();
            cv.cvtColor(mat, ss_jpeg, cv.COLOR_RGBA2RGB, 0);

            var mat_u8a=ss_jpeg.data

            var target=document.getElementById("id_mmap_name").value
            var length=document.getElementById("id_mmap_size").value
            length=Number(length)
            var writeStrLen = node_mmap.write(target,ss_jpeg.data,length);
            console.log('Write Message：strLen:' + writeStrLen  );
        },

//3读取mmap图片
        btn_read_mmap(event) {
            var target=document.getElementById("id_mmap_name").value
            var length=document.getElementById("id_mmap_size").value
            length=Number(length)
            var u8a2=node_mmap.read(target,length)
            // console.log("u8a2",u8a2)
            // let src = new cv.Mat(1080,1920,cv.CV_8UC3,u8a2,0)
            let src=cv.matFromArray(1080,1920,cv.CV_8UC3,u8a2)
            cv.cvtColor(src, src, cv.COLOR_BGR2RGB);
            //显示到真实canvas
            cv.imshow("hidden_canvas",src)
            //界面canvas显示
            //显示ui
            var hidden_cv = document.getElementById("hidden_canvas");
            draw_canvas("id_canvas1",hidden_cv)
            src.delete()
        },
//4 读取mmap图片
        btn_read_mmap_many(event) {
            setInterval(function() {
                var target=document.getElementById("id_mmap_name").value
                var length=document.getElementById("id_mmap_size").value
                length=Number(length)
                var u8a2=node_mmap.read(target,length)
                // console.log(u8a2)
                // let src = new cv.Mat(1080,1920,cv.CV_8UC3,u8a2,0)
                let src=cv.matFromArray(1080,1920,cv.CV_8UC3,u8a2)
                cv.cvtColor(src, src, cv.COLOR_BGR2RGB);
                cv.imshow('id_canvas1', src)
                src.delete()
                // console.log("convas2 btn")
            },33);
        },

    }
}).mount('#mmap')





