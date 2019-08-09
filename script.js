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

        list_td.setAttribute("colspan", "3");
        list_div.setAttribute("style", "height:100px;test-align:center;background-color:#fff;margin:0px 0px 10px 0px;");
        list_div.setAttribute("id", "recentwatched"); //これで、selectorに#recentwatchedを渡すだけで一意に定められる

        list_td.appendChild(list_div);
        list_cell.appendChild(list_td);

        //--貼り付け位置を取得してappend
        let target = document.querySelector("div#header table tbody");
        target.appendChild(label_cell);
        target.appendChild(list_cell);
    }
}
