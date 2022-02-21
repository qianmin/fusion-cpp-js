
const webview1 = document.getElementById("id_webview_fun1")
webview1.addEventListener('dom-ready', () => {
    console.log("add2")
    webview1.openDevTools()
    console.log("add3")
    var my_div=document.getElementById("id_webview_fun2")
    my_div.style.display="none"
})

// const webview2 = document.getElementById(fun2_webview_id)
// webview2.addEventListener('dom-ready', () => {
//     if(debug_mode==1){
//         webview2.openDevTools()
//     }
//     var my_div=document.getElementById(fun2_div_id)
//     my_div.style.display="none"
// })
fun1_div_id='id_div_fun1'
fun1_webview_id='id_webview_fun1'

fun2_div_id='id_div_fun2'
fun2_webview_id='id_webview_fun2'






function hide_all_webviews()
{
    var webview_div1=document.getElementById(fun1_div_id)
    webview_div1.style.display="none"

    var webview_div2=document.getElementById(fun2_div_id)
    webview_div2.style.display="none"
}
function hide_all_sidebar_color()
{
    var lis=document.getElementsByClassName("qm-flag")
    for(i=0;i<lis.length;i++)
    {
        var tmp_length=lis[i].classList.length
        var last_class_name=lis[i].classList[tmp_length-1];
        lis[i].classList.remove("bg-white");
    }
}
// 默认取消sidebar所有状态
hide_all_sidebar_color()
// 但是第一个sidebar默认选中
var myli=document.getElementById("id_li_fun1")
myli.classList.add("bg-white")

Vue.createApp({
    methods: {
        sidebarToggle(e){
            console.log("sidebarToggle")
            var bar=document.getElementById("sidebar")
            if(bar.style.display=="none"){
                bar.style.display=""
            }
            else{
                bar.style.display="none"
            }
        },

        btn_fun1(event){
            hide_all_webviews()
            hide_all_sidebar_color()
            console.log("btn_1")
            // 更新webview到前台显示
            var webview_div=document.getElementById(fun1_div_id)
            webview_div.style.display=""
            // 跟新sidebar选中状态
            var myli=document.getElementById("id_li_fun1")
            myli.classList.add("bg-white")
        },
        btn_fun2(event){
            hide_all_webviews()
            hide_all_sidebar_color()
            console.log("btn_2")

            var webview_div=document.getElementById(fun2_div_id)
            webview_div.style.display=""

            var myli=document.getElementById("id_li_fun2")
            myli.classList.add("bg-white")
        },
        btn_fun3(event){
            hide_all_webviews()
            hide_all_sidebar_color()
            console.log("btn_3")

            // var webview_div=document.getElementById(fun2_div_id)
            // webview_div.style.display=""

            var myli=document.getElementById("id_li_fun3")
            myli.classList.add("bg-white")
        }
    }
}).mount('#id_div_all')
