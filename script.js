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

    }


}