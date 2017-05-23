// $(document).ready(function() {
//
//	 var oTable = $('#example').dataTable({
//		"bJQueryUI" : true,
//		"sPaginationType" : "full_numbers",
//		"bPaginate" : true,
//		"bLengthChange" : true,
//		"bFilter" : true,
//		"bSort" : true,
//		"aaSorting" : [],
//		"bInfo" : true,
//		"bAutoWidth" : true,
//		"sScrollX" : "100%",
//		"sScrollXInner" : "",
//		"bProcessing" : true,
//		"bScrollCollapse" : true,
//		"iDisplayLength" : 100,
//		"sScrollY" : "auto"
//	});
//
//	/*$(".dataTables_paginate").find("span").bind('click.DT', function() {
//		alert("called");
//		// Check if body height is higher than window height :)
//		//if(!($(document).height() > $(window).height())) {
//			if(oTable != null) {
//				alert("called");
//				oTable.fnAdjustColumnSizing(true);
//			}
//		//}
//	});*/
//	// To set the height of the table in IE6 where there is only one record.
//	// if this is the case then record and y-scroll bar are not visible
//	// if($.browser.msie && $.browser.version == "6.0") {
//	$('div.dataTables_scrollBody').fixOverflow();
//	// }
//
//	//	$('#example_wrapper').children().css("width","100%");
//	//	$('#example_wrapper').children().css("overflow","auto");
//});

// datatables date (dd-MON-yy) asc sort function
jQuery.fn.dataTableExt.oSort['shortdate-asc'] = function (x, y) {
    //if(trim(x) != "" && trim(y) != "") {
    //alert("asc called");
    if (x == "&nbsp;" || x == /\s*/) {
        return -1;
    }
    if (y == "&nbsp;" || y == /\s*/) {
        return 1;
    }
    var months = {};
    months["JAN"] = "01";
    months["FEB"] = "02";
    months["MAR"] = "03";
    months["APR"] = "04";
    months["MAY"] = "05";
    months["JUN"] = "06";
    months["JUL"] = "07";
    months["AUG"] = "08";
    months["SEP"] = "09";
    months["OCT"] = "10";
    months["NOV"] = "11";
    months["DEC"] = "12";
    x = (x == "") ? 0 : x.split('-');
    y = (y == "") ? 0 : y.split('-');

    if (x.length) {
        x = x[2] + months[x[1].toUpperCase()] + x[0];
    }

    if (y.length) {
        y = y[2] + months[y[1].toUpperCase()] + y[0];
    }

    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    //}
};
//datatables date (dd-MON-yy) desc sort function
jQuery.fn.dataTableExt.oSort['shortdate-desc'] = function (x, y) {
    // alert("desc called");
    //if(trim(x) != "" && trim(y) != "") {
    if (x == "&nbsp;" || x == /\s*/) {
        return 1;
    }
    if (y == "&nbsp;" || y == /\s*/) {
        return -1;
    }

    var months = {};
    months["JAN"] = "01";
    months["FEB"] = "02";
    months["MAR"] = "03";
    months["APR"] = "04";
    months["MAY"] = "05";
    months["JUN"] = "06";
    months["JUL"] = "07";
    months["AUG"] = "08";
    months["SEP"] = "09";
    months["OCT"] = "10";
    months["NOV"] = "11";
    months["DEC"] = "12";
    x = (x == "") ? 0 : x.split('-');
    y = (y == "") ? 0 : y.split('-');

    if (x.length) {
        x = x[2] + months[x[1].toUpperCase()] + x[0];
    }

    if (y.length) {
        y = y[2] + months[y[1].toUpperCase()] + y[0];
    }

    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    //}
};

(function ($) {
    /*
     * Function: fnGetColumnData
     * Purpose:  Return an array of table values from a particular column.
     * Returns:  array string: 1d data array
     * Inputs:   object:oSettings - dataTable settings object. This is always the last argument past to the function
     *           int:iColumn - the id of the column to extract the data from
     *           bool:bUnique - optional - if set to false duplicated values are not filtered out
     *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
     *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
     * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
     */
    $.fn.dataTableExt.oApi.fnGetColumnData = function (oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty) {
        // check that we have a column id
        if (typeof iColumn == "undefined") return new Array();

        // by default we only wany unique data
        if (typeof bUnique == "undefined") bUnique = true;

        // by default we do want to only look at filtered data
        if (typeof bFiltered == "undefined") bFiltered = true;

        // by default we do not wany to include empty values
        if (typeof bIgnoreEmpty == "undefined") bIgnoreEmpty = true;

        // list of rows which we're going to loop through
        var aiRows;

        // use only filtered rows
        if (bFiltered == true) aiRows = oSettings.aiDisplay;
        // use all rows
        else aiRows = oSettings.aiDisplayMaster; // all row numbers

        // set up data array
        var asResultData = new Array();

        for (var i = 0, c = aiRows.length; i < c; i++) {
            iRow = aiRows[i];
            var aData = this.fnGetData(iRow);
            var sValue = aData[iColumn];

            // ignore empty values?
            if (bIgnoreEmpty == true && sValue.length == 0) continue;

            // ignore unique values?
            else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;

            // else push the value onto the result data array
            else asResultData.push(sValue);
        }

        return asResultData;
    }
}(jQuery));


/*
 * Function: fnGetColumnIndex
 * Purpose:  Return an integer matching the column index of passed in string representing sTitle
 * Returns:  int:x - column index, or -1 if not found
 * Inputs:   object:oSettings - automatically added by DataTables
 *           string:sCol - required - string matching the sTitle value of a table column
 */
$.fn.dataTableExt.oApi.fnGetColumnIndex = function (oSettings, sCol) {
    var cols = oSettings.aoColumns;
    for (var x = 0, xLen = cols.length; x < xLen; x++) {
        if (cols[x].sTitle.toLowerCase() == sCol.toLowerCase()) {
            return x;
        }
        ;
    }
    return -1;
}

// to clear all the applied filters of data tables.
$.fn.dataTableExt.oApi.fnFilterClear = function (oSettings) {
    /* Remove global filter */
    oSettings.oPreviousSearch.sSearch = "";

    /* Remove the text of the global filter in the input boxes */
    if (typeof oSettings.aanFeatures.f != 'undefined') {
        var n = oSettings.aanFeatures.f;
        for (var i = 0, iLen = n.length; i < iLen; i++) {
            $('input', n[i]).val('');
        }
    }

    /* Remove the search text for the column filters - NOTE - if you have input boxes for these
     * filters, these will need to be reset
     */
    for (var i = 0, iLen = oSettings.aoPreSearchCols.length; i < iLen; i++) {
        oSettings.aoPreSearchCols[i].sSearch = "";
    }

    /* Redraw */
    oSettings.oApi._fnReDraw(oSettings);
}


$.fn.initDatatable = function (table, bJQueryUI, sPaginationType, bPaginate, bLengthChange, bFilter, bSort, aaSorting, bInfo, bAutoWidth, sScrollX, sScrollXInner, bProcessing, bScrollCollapse, iDisplayLength, aoColumnDefs, sScrollY, iCookieDuration, sDom, bStateSave, bRetrieve, bScrollAutoCss, bSortCellsTop, iDeferLoading, iDisplayStart, iScrollLoadGap, iTabIndex, oSearch, sAjaxSource, sServerMethod, sAjaxDataProp, sCookiePrefix, aLengthMenu, oColVis, bRemoveSpaces, bServerSide,aoColumns,fnRowCallback,fnInitComplete) {


    //NOTE: for further extension use arguments array

    // There is a crucial bug in IE 9 which adds blank td when there are spaces between two different <td>s.
    // First remove if there are white spaces between <td>s
    // END

    //NOTE: this is also working
//  var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
//  document.body.innerHTML = document.body.innerHTML.replace(expr, '><');
    // END
	// arguments[34] is bRemoveSpaces
	// bRemoveSpaces is not data table flag, but just flag to remove spaces to fix IE 9 table rendering bug
    if(arguments[34] == undefined || arguments[34] == true){
    var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
     $(table).each(function(){
         var tbhtml = $(this).html();
         $(this).html(tbhtml.replace(expr, '><'));
     });
    }

    var oTable = $(table).dataTable({
        "bJQueryUI":bJQueryUI,
        "sPaginationType":sPaginationType,
        "bPaginate":bPaginate,
        "bLengthChange":bLengthChange,
        "bFilter":bFilter,
        "bSort":bSort,
        "aaSorting":aaSorting,
        "bInfo":bInfo,
        "bAutoWidth":bAutoWidth,
        "sScrollX":sScrollX,
        "sScrollXInner":sScrollXInner,
        "bProcessing":bProcessing,
        "bScrollCollapse":bScrollCollapse,
        "iDisplayLength":iDisplayLength,
        "aoColumnDefs":aoColumnDefs,
        "sScrollY":sScrollY,
        "iCookieDuration":iCookieDuration,
        "sDom":sDom,
        "bStateSave":bStateSave,
        "bRetrieve":bRetrieve,
        "bScrollAutoCss":bScrollAutoCss,
        "bSortCellsTop":bSortCellsTop,
        "iDeferLoading":iDeferLoading,
        "iDisplayStart":iDisplayStart,
        "iScrollLoadGap":iScrollLoadGap,
        "iTabIndex":iTabIndex,
        "oSearch":oSearch,
        "sAjaxSource":sAjaxSource,
        "sServerMethod":sServerMethod,
        "sAjaxDataProp":sAjaxDataProp,
        "sCookiePrefix":sCookiePrefix,
        "aLengthMenu": aLengthMenu,
        "oColVis": oColVis,
		"bServerSide": bServerSide,
		"aoColumns":aoColumns,
		"fnRowCallback":fnRowCallback,
		"fnInitComplete":fnInitComplete
    });
   
    
    

    
   

    // To set the height of the table in IE6 where there is only one record.
    // if this is the case then record is hidden by x-scroll bar
    // if($.browser.msie && $.browser.version == "6.0") {
    $('div.dataTables_scrollBody').fixOverflow();
    // }

    //	$('#example_wrapper').children().css("width","100%");
    //	$('#example_wrapper').children().css("overflow","auto");

    return oTable;
}


$.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings, sNewSource, fnCallback, bStandingRedraw) {
    if (typeof sNewSource != 'undefined' && sNewSource != null) {
        oSettings.sAjaxSource = sNewSource;
    }
    this.oApi._fnProcessingDisplay(oSettings, true);
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];

    this.oApi._fnServerParams(oSettings, aData);

    oSettings.fnServerData(oSettings.sAjaxSource, aData, function (json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable(oSettings);

        /* Got the data - add it to the table */
        var aData = (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) : json;

        for (var i = 0; i < aData.length; i++) {
            that.oApi._fnAddData(oSettings, aData[i]);
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        that.fnDraw();

        if (typeof bStandingRedraw != 'undefined' && bStandingRedraw === true) {
            oSettings._iDisplayStart = iStart;
            that.fnDraw(false);
        }

        that.oApi._fnProcessingDisplay(oSettings, false);

        /* Callback user function - for event handlers etc */
        if (typeof fnCallback == 'function' && fnCallback != null) {
            fnCallback(oSettings);
        }
    }, oSettings);
}