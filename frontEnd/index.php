<?php
require_once __DIR__ ."/../backEnd/classes/header.php";
require_once __DIR__ . "/../backEnd/classes/db.php";
?>
      <main class="bg-color">
        <div id="carousel" class="carousel slide carousel-fade " data-interval="2000" data-ride="carousel">
          <div class="carousel-inner">
            <div class="container">
              <h1 class="banner">Brainster Library</h1>
            </div>
            <?php
                if(isset($_SESSION['error'])) {
            ?>
                <div class="error h4 text-danger text-center mt-5"><?= $_SESSION['error']?></div>
            <?php 
                unset($_SESSION['error']);
              }
            ?>
              <div class="carousel-item active position-relative">
                  <img class="d-block w-100 " src="../assets/img/1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                  <img class="d-block w-100" src="../assets/img/2.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                  <img class="d-block w-100" src="../assets/img/3.jpg" alt="Third slide">
              </div>
              <div class="carousel-item">
                  <img class="d-block w-100" src="../assets/img/4.jpg" alt="Forth slide">
              </div>
          </div> 
        </div>
        <div class="container-fluid effect">
          <div class="row">
            <div id="sideBar" class="col-md-3 d-flex flex-column bg-sidebar justify-content-center text-center mx-auto">
              <div id="checkDiv" class="col-sm-10 offset-sm-1 d-flex flex-column text-left text-capitalize">
              </div>
            </div>
            <div class="col-md-9 bg-color">
              <div id="containerCards" class="continer cards d-flex justify-content-center align-content-center flex-wrap">
                <div id="cardsDiv" class="d-flex justify-content-center align-content-center flex-wrap h-25"> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
      <div class="container-fluid text-center text-white bg-color-footer-nav">
        <div class="row">
          <div class="col-12">
            <div name="quotation" class="font-bold d-flex flex-column col-md-8 offset-md-2 p-2 my-sm-2 border-bottom">
              <p id="quotation" class="my-1 mx-auto"></p>
              <span id="authorQuotation" class="tex-right ml-auto"></span>
            </div>
            <p class="p-2 my-2">
              Изработено со &#10084; од студентите на Brainster
            </p>
          </div>
        </div>
      </div>
    </footer>
    <?php
    require_once __DIR__ ."/../backEnd/classes/footer.php";
    ?>
    <script src="./js/AaGeneral.js"></script>
    <script src="./js/userSide.js"></script>
    <script src="./js/signInSignUp.js"></script>
  </body>  
</html>