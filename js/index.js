var fifteenColsID=
[
"#fifteenCardsPage1",
"#fifteenCardsPage2",
"#fifteenCardsPage3"
]

function appendBookmarksVals(title, body,preview_content,uri,page)
{
  // let element = document.getElementById("squares6_topElement_cards_actual").innerHtml;
  let cardStructure = '<div class="squares6_topElement_cards_actual_card">'+
                      '<div id="cardTitleDescHolder">'+
                      '<div style="background-image:url(\''+preview_content+'\');" id="cardTitleDescHolder_left"></div>'+
                      '<div id="cardTitleDescHolder_right">'+
                      '<div id="cardTitleDescHolder_right_top">'+'<a href="'+uri+'" target=_blank""><p>' +title+ '</p></a>'+'</div>'+
                      '</div>'+
                      '</div>'+
                      '</div>';


  var title = this.title;
  var body = this.body;
  var preview_content = this.preview_content;
  var url = this.uri

  $(page).append(cardStructure);
}
/*
functon makeHttpRequest(jsonFile,resourceName)
{
  var xhttp=new XMLHttpRequest(); //create an http object
  var arr;

  xhttp.onreadystatechange= function(){
        if(xhttp.readyState==4 && this.status==200){//connection was successful
          arr=JSON.parse(xhttp.responseText).resourceName;
          for(x=0; x<15;x++)
          {
   //      $("#squares6_topElement_cards_actual").html("hi");    // only one "hi"
           loadBookmarksVals(arr[x]['title'],arr[x]['body'],
           arr[x]['preview_content'],arr[x]['uri']);  //several hi
          }

        }//end of if(xhttp.readyState...


  }//end of xhttp.onreadystatechange
  xhttp.open("GET", "../json/"+jsonFile+".json", true);
  xhttp.send();
}
*/
function loadBookmarks()
{

   var xhttp=new XMLHttpRequest(); //create an http object
  // var arr;
  var fifteenColsIDindex = 0 ;

   xhttp.onreadystatechange= function()
   {
         if(xhttp.readyState==4 && this.status==200){//connection was successful
           var arr=JSON.parse(xhttp.responseText).bookmarks
           for(x=0; x<15;x++)
           {
             appendBookmarksVals(arr[x]["title"],arr[x]["body"],
             arr[x]["preview_content"],arr[x]["uri"],fifteenColsID[fifteenColsIDindex]);  //several hi
             if( ((x+1)%5)==0)
             {
             fifteenColsIDindex++
             }

           }

         }//end of if(xhttp.readyState...


   }//end of xhttp.onreadystatechange
   xhttp.open("GET", "../json/bookmarks.json", true);
   xhttp.send();

}//end of getDescription

function makeNRows(lastPageItemsCount)
{
if(lastPageItemsCount<=4){return 1}
if(lastPageItemsCount>4 && lastPageItemsCount<9){return 2}
if(lastPageItemsCount>8 && lastPageItemsCount<13){return 3}
if(lastPageItemsCount>12 && lastPageItemsCount<17){return 4}
}

function returnGridRowId(idNum)
{
  var contentRow = [
    "page3_right_content_row1",
    "page3_right_content_row2",
    "page3_right_content_row3",
    "page3_right_content_row4"
  ];
  return contentRow[idNum];
}

function makeTextCard(title, text,uri)
{
  var cardStructure = '<div class="listViewCard">'+
                      '<div class="listViewCardContents">'+
                      '<div class="textCard">'+
                      '<span class="textCardTitle">'+title+'<br></span>'+
                      '<span class="textCardText"><br>'+text+'<br></span>'+
                      '</div></div></div>';
  return cardStructure;
}

function makeImgCard(title, text,uri, imgUri)
{
  let cardStructure = '<div class="listViewCard">'+
                      '<div class="listViewCardContents">'+
                      '<div class="imageCard">'+
                      '<div class="imageCardTop"'+title+'</div>'+
                      '<div style="background-image:url(\''+imgUri+'\')" class="imageCardMiddle"></div>'+
                      '<div class="imageCardBottom"></div></div></div></div>';
      return cardStructure;
}

function loadProjGrid(lastPageItemsCount,resourceName)
{
//  alert("resourceName: "+resourceName)

  //all are reset after each loop iteration
  var divDef, arr, type, title, text, uri, imgUri, textBox, imgBox, cardStructure

  var jsonFilePageCount = 1 //totalnumber of pages in the json file
  var lastPageItemsCount = this.lastPageItemsCount//total number of items on the last page
  var rowContainer = $("#page3_right_content")

  for(rowNum=0;rowNum<4;rowNum++)// nRows in [1,4]
  {
    divDef = '<div class ="page3_right_content_row"></div>'
    rowContainer.append(divDef)
  }

  //variables below are *not reset* after each loop iteration
  var nRows = makeNRows(lastPageItemsCount)//returns either 1,2,3,4
  var fileRow = 0   //position in the json file
  var addedBoxes = 0;//boxes in a given row


  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange= function()
  {
    if(xhttp.readyState==4 && this.status==200)
    {
      // alert('ready')
      arr=JSON.parse(xhttp.responseText).page1
    //  alert("arr : "+arr)
  //    alert("nRows : "+nRows)
         for(rowNum=0;rowNum<nRows;rowNum++)// nRows in [1,4]
        {
        //      alert("row: "+rowNum)
              textId=returnGridRowId(rowNum); //html div id of row ex: page3_right_content_row1

        //      divDef = '<div class ="page3_right_content_row" id="'+id+'"></div>'
              //alert(divDef)
          //    alert("id: "+textId)
              // rowContainer.append(divDef)
              $("#page3_right_content").children().eq(rowNum).attr("id",textId)
        //      alert("new id of row#: "+$("#page3_right_content").children().eq(rowNum).attr("id"))
              addedBoxes = 0;

          //each while loop appends to a single row
          while(addedBoxes<4&&lastPageItemsCount>0) //begin by assuming a max of 4 boxes in each loop iteration
                {
              //    alert("addedBoxes : "+addedBoxes)

                        type = arr[fileRow]["type"]
                //        alert("type: "+type)

                        //determine if json row is text or imgCard
                         if(type=="text"){
                             title = arr[fileRow]["title"]
                             text = arr[fileRow]["text"]
                             uri = arr[fileRow]["uri"]

                      //       $(textId).append(makeTextCard(title, text,uri))
                             var cardStructure = '<div class="listViewCard">'+
                                                 '<div class="listViewCardContents">'+
                                                 '<div class="textCard">'+
                                                 '<span class="textCardTitle"> <a href="'  +uri+ '">' +title+'</a><br></span>'+
                                                 '<span class="textCardText"><br>'+text+'<br></span>'+
                                                 '</div></div></div>';
                             // $("#"+textId).append("<div style=\"background-color:'pink'\"pink text</div>")
                             $("#"+textId).append(cardStructure)

                             // alert("fileRow : "+fileRow)

                      //       alert("text card: "+makeTextCard(title, text,uri))
                        addedBoxes++
                         }
                         else {
                           title = arr[fileRow]["title"]
                           text = arr[fileRow]["text"]
                           uri = arr[fileRow]["uri"]
                           imgUri = arr[fileRow]["imgUri"]

                           $("#"+textId).append(makeImgCard(title, text,uri, imgUri))
                           alert("imgCard text: "+textId)
                             addedBoxes++
                         }


                  fileRow++ //move one row down the file every loop
                  lastPageItemsCount--
              //    if(addedBoxes==3 || lastPageItemsCount==0){addedBoxes=4;}
                  //addedBoxes==3 ; end of the row move down
                  //lastPageItemsCount==0 ; no boxes left to add

            }  /* */ //while (addedBoxes)
        }//for loop

    }//if(xhttp.readyState...
  }//xhttp.onready
  xhttp.open("GET", "../json/gridView.json", true);
  xhttp.send();


}//loadProjGrid
function showPage()
{

}

function navigateBookmarks()
{
  var index = 0;
  //forward
  $("#fifteenCardsFlex_navButtonsTop").click(function()
  {
    if(index<2)
    {
      $("#fifteenCardsFlex_navPagesOverflow").animate({"margin-left": '-=100%'});
      index+=1;
    }
  });
  //back
  $("#fifteenCardsFlex_navButtonsBottom").click(function()
  {
    if(index>0)
    {
      // if(index==1)
      // {
      //   $("#fifteenCardsFlex_navPagesOverflow").animate({"margin-left": '-=100%'});
      //   index-=1;
      // }
      $("#fifteenCardsFlex_navPagesOverflow").animate({"margin-left": '+=100%'});
      index-=1;
    }
  });
}

$(document).ready(function(){
//  $("#squares6_topElement_nav").html = "cardStructure";
// alert($("#squares6_topElement_cards_actual").html)
loadProjGrid(lastPageItemsCount=12,resourceName="page1");
loadBookmarks();
navigateBookmarks();
});
