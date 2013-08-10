/***
* DOM element modification tools
* @version 1.0.20130810
* @author Wade Harkins (vdtdev@gmail.com)
*/

// Positioning
/**
 * Class that allows quick access to the target element's position
 */
function positionMod(element_id){
	this.target=document.getElementById(element_id);
	/**
	 * Is element currently set to absolute positioning?
	 * @return True if absolute, otherwise false
	 */
	this.isAbsolute=function(){return (this.target.style.position=="absolute")?true:false;};
	/**
	 * The x,y (left,top) position of the element (doesn't check for abs positioning)
	 * @return json x=left, y=top
	 */
	this.getPosition=function(){return {"x":this.target.style.left, "y":this.target.style.top}};	
	/**
	 * Set the absolute position of the element<br/>
	 * Automatically sets positioning to absolute if not already set
	 * @param pos Object with X and Y properties
	 */
	this.setPosition=function(pos){this.target.style.left=pos.x;this.target.style.top=pos.y;this.target.style.position="absolute";};
}
