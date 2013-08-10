/**
 * Vanilla Java Class Generator
 * @author Wade Harkins <vdtdev@gmail.com>
 * @version 1.0r2013.04.14
 */
function vgen(className){
	this.fields = new Array();
	this.code = new Array();
	this.classname=className;
	this._fieldName=function(f){
		return f.trim().split(" ")[1].trim();
	};
	this._fieldType=function(f){
		var fr=f.trim().split(" ")[0];
		return fr.trim();
	};
	this.addFields=function(flds){
		var f = flds.split(";");
		for(i=0;i<f.length;i++){
			this.fields.push(f[i]);
		}
	};
	
	this.generate=function(){
		this._generateClassHeader();
		this._generateFields();
		this._generateConstructor();
		this._generateProperties();
		this.code.push("}");
	};
	
	this._generateClassHeader=function(){
		var s = "public class " + this.classname + "{";
		this.code.push(s);
	};
	
	this._generateFields=function(){
		var tf;
		for(i=0;i<this.fields.length;i++){
			tf = "private " + this.fields[i] + " ;";
			this.code.push(tf);
		}
	};
	this._generateConstructor=function(){
		var constr = new String();
		constr+="public "+this.classname + "(";
	/*	for(i=0;i<this.fields.length;i++){
			constr+= this.fields[i] + (i==this.fields.length)?"":",";
		}*/
		if(this.fields.length!=0){
			constr+=this.fields.join(",");
		}
		constr+="){";
	//	this.code.push(constr);
		for(i=0;i<this.fields.length;i++){
			constr+="this."+ this._fieldName(this.fields[i]);
			constr+="=" + this._fieldName(this.fields[i]) + ";";

		}
		this.code.push(constr);
		this.code.push("}");
	};
	
	this._generateProperties=function(){
		var gtemplate = "public $1 get$2(){ return this.$3;}";
		var stemplate = "public void set$1($2 value){this.$3=value;}";
		var g = new String();
		var s = new String();
		for(i=0;i<this.fields.length;i++){
			ft = this._fieldType(this.fields[i]);
			fn = this._fieldName(this.fields[i]);
			// getter
			g=gtemplate;
			g=g.replace("$1",ft);
			g=g.replace("$2",this._fcase(fn));
			g=g.replace("$3",fn);
			this.code.push(g);
			// setter
			s=stemplate;
			s=s.replace("$1",this._fcase(fn));
			s=s.replace("$2",ft);
			s=s.replace("$3",fn);
			this.code.push(s);
		}
	};
	
	this._fcase = function (v){
		return v[0].toUpperCase() + v.substring(1,v.length);
	};
	this.dump = function(){
		var d = new String();
		for(i=0;i<this.code.length;i++){
			d = d + this.code[i];
		}
		return d;
	};
}
