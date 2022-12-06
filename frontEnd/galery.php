<?php
require_once __DIR__ ."/../backEnd/classes/header.php";
require_once __DIR__ . "/../backEnd/classes/db.php";
?>
      <main class="bg-color">
        <?php
            if(isset($_SESSION['error'])) {
        ?>
            <div class="error h4 text-danger text-center mt-5"><?= $_SESSION['error']?></div>
        <?php 
            unset($_SESSION['error']);
          }
        ?>
        <div class="container">
            <div class="row d-flex flex-row align-content-center">
                <div id="imgPrint" class="col-md-6 rounded mt-4 "></div>
                <div id="infoPrint" class="col-md-6 text-left mt-4 "></div>
            </div>
            <div class="row text-center justify-content-between">
              <div id="commentMainDiv1" class="col-md-8 offset-md-2 mb-5">
              <button id='publicComment' type="submit" onclick="openNavRight()" class="text-center btn btn-outline-info">See all comments...</button>

              <button id='submitComment' type="submit" class="text-center btn btn-outline-success">Leave a comment...</button>
              
              <button id='writePersonal' type="submit" onclick="openNavLeft()" class="text-center btn btn-outline-primary">Personal notes</button>
              </div>
            </div>

              <div id="commentMainDiv" class="overlayRight spy1 text-white">
                  <h4 id="comments">Comments:</h4>
                  <a href="javascript:void(0)" class="closebtn d-inline-block" onclick="closeNavRight()">&times;</a>
                  <div id="commentSection" class="overlayRight-content"></div>
                  <div id="leaveComment" class="d-flex flex-column text-white rounded p-1 my-1 justify-content-md-between"></div>
              </div>
            </div>

            <div id="myNav" class="overlay spy1">
                <a href="javascript:void(0)" class="closebtn d-inline-block" onclick="closeNavLeft()">&times;</a>
                <button id="submitNewPersonalComment" class="btn btn-sm btn-outline-success mt-4 mb-1 mx-2 justify-item-center py-1 px-1">Add new comment</button>
              <div id="perosnalCommDiv" class="overlay-content"></div>
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
    <script src="./js/galery.js"></script>
    <script src="./js/signInSignUp.js"></script>
    <script src="./js/personalComments.js"></script>
  </body>  
</html>