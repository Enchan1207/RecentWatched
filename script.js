let page = 0, isfirstpage = true, islastpage = false; //リストページ

window.onload  = function(){

    //--まず、商品ページなのかホームページなのかを調べる
    let regex = RegExp('.*/catalog/g/.*');
    let isProduct = regex.test(location.href);

    //--商品ページならlocalstorageに商品コードを保存する
    if(isProduct){
        //-hrefから商品コードを抽出
        let pdregex = /.*\/catalog\/g\/g(.*?)\//;
        let pdcode = location.href.match(pdregex);

        //--lsを取得、重複しているかチェック(F5アタック防止)
        let _list = localStorage.getItem("list");
        let list;
        let rst = 1;
        
        if(_list != null){
            list = _list.split(",");
            list.forEach(cell => {
                if(cell == pdcode[1]) rst *= 0;
            });
        }else{
            list = "";
        }

        //--重複していなければ最後尾に追加して終わり
        if(rst == 1){
            list = list + pdcode[1] + ",";
            localStorage.setItem("list", list);
        }
    }

    //--ホームページならlocalstorageから呼び出してリストを生成し、トップバーの下に追加
    else{
        //--ラベルを作る
        let label_cell = document.createElement("tr");
        let label_td = document.createElement("td");

        label_td.setAttribute("colspan", "3");
        label_td.setAttribute("class", "lineb");
        label_td.setAttribute("style", "text-align:center;font-size:1.2em;");

        label_cell.appendChild(label_td);
        label_td.innerHTML = "最近閲覧した商品 " + label_td.innerHTML;

        //--リストを作る
        let list_cell = document.createElement("tr");
        let list_td = document.createElement("td");
        let list_div = document.createElement("div");
        let list_pspan = document.createElement("span");
        let list_nspan = document.createElement("span");
        let list_pbutton = document.createElement("button");
        let list_nbutton = document.createElement("button");
        let list_ul = document.createElement("ul");

        list_td.setAttribute("colspan", "3");
        list_div.setAttribute("style", "height:100px;text-align:center;background-color:#fff;margin:0px 0px 10px 0px;");
        list_ul.setAttribute("id", "recentwatched"); //これで、selectorに#recentwatchedを渡すだけで一意に定められる
        list_ul.setAttribute("style", "display:inline-block;text-align:center;width:90%;");

        list_pspan.setAttribute("style", "display:inline-block;width:3%;height:70%;margin-right:1%;");
        list_nspan.setAttribute("style", "display:inline-block;width:3%;height:70%;margin-left:1%;");
        list_pbutton.addEventListener( "click" , udlist_p , false );
        list_nbutton.addEventListener( "click" , udlist_n , false );

        list_pbutton.innerHTML = "◀︎";
        list_nbutton.innerHTML = "▶︎";


        list_pspan.appendChild(list_pbutton);
        list_nspan.appendChild(list_nbutton);
        list_div.appendChild(list_pspan);
        list_div.appendChild(list_ul);
        list_div.appendChild(list_nspan);
        list_td.appendChild(list_div);
        list_cell.appendChild(list_td);

        //--貼り付け位置を取得してappend
        let target = document.querySelector("div#header table tbody");
        target.appendChild(label_cell);
        target.appendChild(list_cell);

        udlist(0);
    }
}

//--リストを更新する
function udlist_n(){
    if(!islastpage) page++;
    udlist();
}
function udlist_p(){
    if(!isfirstpage) page--;
    udlist();
}

function udlist() {
    isfirstpage = (page == 0);

    //--ulを取得
    let target = document.querySelector("ul#recentwatched");
    target.innerHTML = "";
    
    //--lsを取得してパース
    let _pdlist = localStorage.getItem("list");
    if(_pdlist == null) return false;
    let pdlist = _pdlist.split(",");
    
    //--forで回して、ページ数に応じた範囲の商品を表示
    let point = 8;
    for(let i = 0; i < point; i ++){
        //--
        if(pdlist[i + page * point]=="") {
            islastpage = true;
            break;
        }else{
            islastpage = false;
        }

        //--各セルを作成
        let cell = document.createElement("li");
        let cell_icon = document.createElement("img");
        let cell_label = document.createElement("span");
        let cell_link = document.createElement("a");

        cell.setAttribute("style", "display:inline-block;width:100px;height:70px;background-color:#ccc;margin:15px 5px;");
        cell_link.setAttribute("href", "http://akizukidenshi.com/catalog/g/g" + pdlist[i + page * point] + "/");
        cell_icon.setAttribute("src", "http://akizukidenshi.com/img/goods/L/" + pdlist[i + page * point] + ".jpg");
        cell_icon.setAttribute("style", "height:70%;");
        cell_label.setAttribute("style", "display:inline-block;height:30%;");
        cell_label.innerHTML = pdlist[i + page * point];

        cell_link.appendChild(cell_icon);
        cell_link.appendChild(document.createElement("br"));
        cell_link.appendChild(cell_label);
        cell.appendChild(cell_link);
        target.appendChild(cell);
    }
}