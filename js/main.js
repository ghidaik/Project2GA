
$(document).ready(function(){
    
  
    $( "#searchBtn" ).click(function(e) { 
    var searchInput=$('#searchInput').val();
    searchResults(searchInput);
    e.preventDefault();
 
    });  

});

//display the search results.
function searchResults(searchInput){
console.log(searchInput);


var omdbUrl="http://www.omdbapi.com/?s=";
var apiKey;
apiKey= "e1bfd344"; 

$.ajax({

    url:omdbUrl+searchInput+"&apiKey="+apiKey, 
    
    success : function(response){

        onSuccess(response);    
            },


    error :function(data){

         onerror(data);
               
            },
                           

})}; 


function onSuccess (response){
    console.log(response);
  
    var movies= response.Search;
    var output ='';

    $.each(movies, function(i,movie){
       
 output+= `

    <div class="col-md-3">  
    <div class="jumbotron">
       <div class="well text-center">
    
         <img src="${movie.Poster}">
         <h5>${movie.Title}<h5>
        <a onclick="movieSelected('${movie.imdbID}')"class="btn btn-outline-info" href="#"> More Details.. </a>                        >
           
        </div>
       </div>    
    </div> `;
});

    $('#allMovies').html(output);
    
};


function onerror(){
    console.log('Error');

} 


// the selected movie id 
function movieSelected(id){

sessionStorage.setItem('movieId', id);
//redirect the browser to 'movieInfo.html' page
window.location='movieInfo.html' ;
return false;
};



 

function getMovie(){

var movieId= sessionStorage.getItem('movieId');
var omdburl="http://www.omdbapi.com/?i=";

var apiKey;
apiKey= "e1bfd344"; 

$.ajax({

    url:omdburl+movieId+"&apiKey="+apiKey, 
    
    success : function(response){

        movieInfo(response);    
    },


    error :function(data){

         mError(data);
               
        },
                           

})}; 

// display movie title,Ratings,Released...etc
function movieInfo (response){
    console.log(response);
  

 var selectedMovie =`

    <div class="jumbotron">   
       <div class="row">
          <div class="col-md-4">
             <img src=${response.Poster}>
          </div>

           <div class="col-md-6">
                <h3>${response.Title}</h3>
                
                <ul class="list-group"> 
                   <li class="list-group-item"><strong>Genre :</strong> ${response.Genre}</li>
                   <li class="list-group-item"><strong>Ratings :</strong> ${response.imdbRating}</li>
                   <li class="list-group-item"><strong>Rated :</strong> ${response.Rated}</li>
                   <li class="list-group-item"><strong>Type :</strong> ${response.Type}</li>
                   <li class="list-group-item"><strong>Runtime :</strong> ${response.Runtime}</li>
                   <li class="list-group-item"><strong>Released:</strong>${response.Released}</li>
                   <li class="list-group-item"><strong>Actors :</strong> ${response.Actors}</li>
                </ul>
              
            </div>
       </div>


      <div class="row">
       <div class="well">
        <hr>
    
        <div class="jumbotron jumbotron-fluid">
          <div class="plot">
           </div>
          <p>${response.Plot}</p>
          
       </div>
      </div>
   </div>
</div>`


$('#movie').html(selectedMovie);

    
};


function mError(){
    console.log('Error');
} ;



