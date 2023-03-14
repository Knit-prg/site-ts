let ex={
	name:"sbm_imitations_database"
	,lang_url:"/site/sbm/ja/imitations_database/lang_*.json"
	,command_number_table:{"1320000":"sbm_imitations_database"}
	,commands:{
		sbm_imitations_database:{
			run:function(arg){return "test:"+arg;}
			,help:function(arg){return arg;}
		}
	}
	,remove:function(){
		delete _knit.system.commands.sbm_imitations_database;
		delete _knit.system.command_number_table["1320000"];
	}
};
_knit.system.load_extension(ex);