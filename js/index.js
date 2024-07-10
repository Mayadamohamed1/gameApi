class Games{
    constructor(){
        document.querySelectorAll(".nav-link").forEach(link=>{
            link.addEventListener("click",()=>{
              this.activeLink(link);
              const cattegory = link.getAttribute("data-category");
              this.getGames(cattegory);
            });
        });
        this.loading=document.querySelector(".loading");
        this.details=document.getElementById("details");
        this.games=document.getElementById("games")
       
    };

     activeLink(link){
        document.querySelector(".navbar-nav .active").classList.remove("active");
        link.classList.add("active");
    }
    displayGames(data){
        let boxGame=``;
        for(let i=0; i<data.length;i++){
        boxGame +=` <div class="col">
                        <div data-id="${data[i].id}" class="card h-100 bg-transparent" role="button">
                            <div class="card-body">
                                <figure>
                                    <img src="${data[i].thumbnail}" alt="" class="card-img-top object-fit-cover h-100">
                                </figure>
                                <figcaption>
                                    <div class="stack justify-content-between">
                                        <h3 class="h5 text-light">${data[i].title}</h3>
                                        <span class="badge text-bg-primary p-2">free</span>
                                    </div>
                                    <p class="card-text text-center text-light opacity-50">${data[i].short_description}</p>
                                </figcaption>
                            </div>
                            <footer class="card-footer justify-content-between stack ">
                                <span class="badge badge-color">${data[i].genre}</span>
                                <span class="badge badge-color">${data[i].platform}</span>
                            </footer>
                        </div>
                    </div>`
    }
    document.getElementById("gData").innerHTML=boxGame;
}
    async getGames(category){
this.loading.classList.remove("d-none")
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '26da345a5fmshfe93993c517bcb0p1478d6jsnebb3d711a852',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            },
        };
        const api=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const resp= await api.json();
        this.loading.classList.add("d-none")
        console.log(resp);
        this.displayGames(resp);
        document.querySelectorAll(".card").forEach(card=>{
            card.addEventListener("click",()=>{
                this.details.classList.remove("d-none");
                this.games.classList.add("d-none");
                detailss.getDetails(card.dataset.id);
            })
        })
        }
}

const games = new Games();
class Details{
    constructor(id){
        this.bClose=document.getElementById("bClose").addEventListener("click",()=>{
            document.getElementById("details").classList.add("d-none");
            document.getElementById("games").classList.remove("d-none");
        });
        this.getDetails(id);

    }

    
   displayDetails(data){
   const detailBox=`  <div class="col-md-4">
                    <img src="${data.thumbnail}" alt="" class="w-100">
                </div>
                <div class="col-md-8">
                    <h3>Title:${data.title}</h3>
                    <p>Platform: <span class=" text-warning">${data.platform}</span></p>
                    <p>Category: <span class=" text-warning">${data.genre}</span></p>
                    <p>Status: <span class=" text-warning">${data.status}</span></p>
                    <p class="small">${data.description}</p>
                    <a href="${data.game_url}" class="btn btn-outline-danger">Show Game</a>
                </div>`
                document.getElementById("detacontent").innerHTML=detailBox;
   }
    async getDetails(id){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '26da345a5fmshfe93993c517bcb0p1478d6jsnebb3d711a852',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
    const api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const response= await api.json(); 
    console.log(response);
    this.displayDetails(response);
   }
}
const detailss=new Details();

