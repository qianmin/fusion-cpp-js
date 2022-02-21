// import path from "path";
// import node_mmap from "../Napi/qmnode_mmap.node";
// import cv from "./opencv451";

window.onload = () => {
    cameraSwitchApply();
}
/**
 * 【摄像头默认使用】或【摄像头切换使用】
 */
function initCameraLists()
{
    var videoAll = document.getElementById("video-all");
    //获取摄像头的名称和设备id
    //select中设置摄像头选项
    let VideoAllInfo=[];
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        if(devices){
            console.info(devices);
            devices.forEach((value,index)=>{
                /**
                 //kind: "videoinput";指的是摄像头输入设备。
                 //kind: "audiooutput"麦克风或笔记本自身的麦克风输入设备。
                 //kind: "audioinput" 麦克风或笔记本自身的麦克风输入设备。
                 */
                if(value.kind=="videoinput"){
                    VideoAllInfo.push(value);
                }
            });
            if(VideoAllInfo.length>0){
                let videoAllItem="";
                VideoAllInfo.forEach((value,index)=>{
                    let ItemDom=`<option value="${value.deviceId}">${value.label}</option>`
                    videoAllItem += ItemDom;
                });
                videoAll.innerHTML = videoAllItem;
            }
        }
    });
}

function cameraSwitchApply(){
    var Mvideo = document.getElementById("video");
    initCameraLists();
    //监听select的改变:切换摄像头
    document.getElementById("video-all").onchange = () => {
        if (document.getElementById("video-all").children.length > 0) {
            let selIndex = document.getElementById("video-all").selectedIndex; // //获取当前选择的选项的index值
            let selectedValue = document.getElementById("video-all").options[selIndex].value; //获取选中的value值
            let selectedText = document.getElementById("video-all").options[selIndex].innerText; //获取选中的内容
            console.log(selectedValue,selectedText);
            //切换摄像头
            setCatchVideo(Mvideo,selectedValue);
        };
    }
    //设置默认摄像头
    open_camera_by_id(Mvideo,"");
}

/**
 * 设置摄像头和切换摄像头
 * @param {Object} videoDom  摄像头对象
 * @param {Object} videoID   摄像头deviceId
 */
function open_camera_by_id(videoDom,videoID){
    let videoObj;
    if(videoID==""){
        //设置默认获取的摄像头
        videoObj = {
            "video": true
        }
    }else{
        //切换摄像头
        videoObj = {
            "video": { deviceId: videoID},
        };
    }
    let errBack = function(error) {
        console.log("视频捕获错误: ", error.code,error);
    };
    if (navigator.getUserMedia) { //正常的情况下
        navigator.getUserMedia(videoObj, (stream)=> {
            videoDom.srcObject = stream;
            videoDom.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit
        navigator.webkitGetUserMedia(videoObj,  (stream)=> {
            videoDom.src = window.webkitURL.createObjectURL(stream);
            videoDom.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Firefox
        navigator.mozGetUserMedia(videoObj,  (stream)=> {
            videoDom.src = window.URL.createObjectURL(stream);
            videoDom.play();
        }, errBack);
    };
}



Vue.createApp({
    methods: {
        btn_stop(event) {
            let video_dom=document.getElementById("video")
            video_dom.pause()
        },
        btn_reopen(event) {
            let video_dom=document.getElementById("video")
            let selIndex = document.getElementById("video-all").selectedIndex; // //获取当前选择的选项的index
            let selectedValue = document.getElementById("video-all").options[selIndex].value; //获取选中的valu
            let videoObj;
            if(selectedValue==""){
                //设置默认获取的摄像头
                videoObj = {
                    "video": true
                }
            }else{
                //切换摄像头
                videoObj = {
                    "video": { deviceId: selectedValue},
                };
            }
            let errBack = function(error) {
                console.log("视频捕获错误: ", error.code,error);
            };
            if (navigator.getUserMedia) { //正常的情况下
                navigator.getUserMedia(videoObj, (stream)=> {
                    video_dom.srcObject = stream;
                    video_dom.play();
                }, errBack);
            }
        },
        btn_snap(event){
            //摄像头照相功能
            console.log("btn snap")
            var Mvideo = document.getElementById("video");
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.drawImage(Mvideo, 0, 0, canvas.width, canvas.height);

        }
    }
}).mount('#container-video')
