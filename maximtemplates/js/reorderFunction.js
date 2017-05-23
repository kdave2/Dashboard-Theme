 
	 function moveUp(sourceID)
        {
            var ddl = document.getElementById(sourceID);
            //var size = ddl.length;
            //var index = ddl.selectedIndex;
            var selectedItems = new Array();
			var temp = {innerHTML:null, value:null};
            for(var i = 0; i < ddl.length; i++)
                if(ddl.options[i].selected)             
                    selectedItems.push(i);

            if(selectedItems.length > 0)    
                if(selectedItems[0] != 0)
                    for(var i = 0; i < selectedItems.length; i++)
                    {
						temp.innerHTML = ddl.options[selectedItems[i]].innerHTML;
						temp.value = ddl.options[selectedItems[i]].value;
                        ddl.options[selectedItems[i]].innerHTML = ddl.options[selectedItems[i] - 1].innerHTML;
                        ddl.options[selectedItems[i]].value = ddl.options[selectedItems[i] - 1].value;
                        ddl.options[selectedItems[i] - 1].innerHTML = temp.innerHTML; 
                        ddl.options[selectedItems[i] - 1].value = temp.value; 
                        ddl.options[selectedItems[i] - 1].selected = true;
                        ddl.options[selectedItems[i]].selected = false;
                    }
        }

        function moveDown(sourceID)
        {
            var ddl = document.getElementById(sourceID);
            //var size = ddl.length;
            //var index = ddl.selectedIndex;
            var selectedItems = new Array();
			var temp = {innerHTML:null, value:null};
            for(var i = 0; i < ddl.length; i++)
                if(ddl.options[i].selected)             
                    selectedItems.push(i);

            if(selectedItems.length > 0)    
                if(selectedItems[selectedItems.length - 1] != ddl.length - 1)
                    for(var i = selectedItems.length - 1; i >= 0; i--)
                    {
                        temp.innerHTML = ddl.options[selectedItems[i]].innerHTML;
                        temp.value = ddl.options[selectedItems[i]].value;
                        ddl.options[selectedItems[i]].innerHTML = ddl.options[selectedItems[i] + 1].innerHTML;
                        ddl.options[selectedItems[i]].value = ddl.options[selectedItems[i] + 1].value;
                        ddl.options[selectedItems[i] + 1].innerHTML = temp.innerHTML; 
                        ddl.options[selectedItems[i] + 1].value = temp.value; 
                        ddl.options[selectedItems[i] + 1].selected = true;
                        ddl.options[selectedItems[i]].selected = false;
                    }
        }
        function moveFirst(sourceID)
        {
        	var $op = $('#' + sourceID + ' option:selected');
        	var ob = $op.clone();
            $op.remove();
            $('#' + sourceID).prepend(ob);
        }
        function moveLast(sourceID)
        {
        	var $op = $('#' + sourceID + ' option:selected');
        	var ob = $op.clone();
            $op.remove();
            $('#' + sourceID).append(ob);
        }
        function listbox_moveacross(sourceID, destID) {
            var src = document.getElementById(sourceID);
            var dest = document.getElementById(destID);
         
            for(var count=0; count < src.options.length; count++) {
         
                if(src.options[count].selected == true) {
                        var option = src.options[count];
         
                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text;
                        newOption.selected = true;
                        try {
                                 dest.add(newOption, null); //Standard
                                 src.remove(count, null);
                         }catch(error) {
                                 dest.add(newOption); // IE only
                                 src.remove(count);
                         }
                        count--;
                }
            }
            
            if(destID == "masterList" || destID == "allAreaSelected"){
            	var selectList = $('#' + destID + ' option');

				selectList.sort(function(a,b){
				    return a.text > b.text ? 1 : -1;
				});
				$('#' + destID).html(selectList);
            }
            
        }
        function listbox_moveacrossAll(sourceID, destID) {
            var src = document.getElementById(sourceID);
            var dest = document.getElementById(destID);
            for(var count=0; count < src.options.length; count++) {
         
                        var option = src.options[count];
         
                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text;
                        newOption.selected = true;
                        try {
                                 dest.add(newOption, null); //Standard
                                 src.remove(count, null);
                         }catch(error) {
                                 dest.add(newOption); // IE only
                                 src.remove(count);
                         }
                        count--;
                         
            }
            if(destID == "masterList" || destID == "allAreaSelected"){
            	var selectList = $('#' + destID + ' option');

				selectList.sort(function(a,b){
				    return a.text > b.text ? 1 : -1;
				});
				$('#' + destID).html(selectList);
            }
            
        }