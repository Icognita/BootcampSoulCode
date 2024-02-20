import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.css']
})
export class HomeGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("quiz_div").addEventListener("mouseover", mouseOverGame);
    document.getElementById("quiz_div").addEventListener("mouseout", mouseOutGame);

    function mouseOverGame() {
      document.getElementById("dark_circle_quiz").style.display = "inline-block";
      document.getElementById("h1_quiz").style.display = "inline-block";
    }

    function mouseOutGame() {
      document.getElementById("dark_circle_quiz").style.display = "none";
      document.getElementById("h1_quiz").style.display = "none";
    }

    document.getElementById("desafio_div").addEventListener("mouseover", mouseOverDesafio);
    document.getElementById("desafio_div").addEventListener("mouseout", mouseOutDesafio);

    function mouseOverDesafio() {
      document.getElementById("dark_circle_desafio").style.display = "inline-block";
      document.getElementById("h1_desafio").style.display = "inline-block";
    }

    function mouseOutDesafio() {
      document.getElementById("dark_circle_desafio").style.display = "none";
      document.getElementById("h1_desafio").style.display = "none";
    }

    document.getElementById("ranking_div").addEventListener("mouseover", mouseOverRanking);
    document.getElementById("ranking_div").addEventListener("mouseout", mouseOutRanking);

    function mouseOverRanking() {
      document.getElementById("dark_circle_ranking").style.display = "inline-block";
      document.getElementById("h1_ranking").style.display = "inline-block";
    }

    function mouseOutRanking() {
      document.getElementById("dark_circle_ranking").style.display = "none";
      document.getElementById("h1_ranking").style.display = "none";
    }
  }

}
