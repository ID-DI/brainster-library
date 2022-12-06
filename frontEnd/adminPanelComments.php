<?php
require_once __DIR__ . "../../backEnd/classes/header.php";
// if(!isset($_SESSION['admin']))
// {
//     header("Location:login.php");
//     die();
// }
// else
// {
    require_once __DIR__ . "../../backEnd/classes/db.php";
// }
?>
        <main class="container-fluid">
            <div class="row">
                <div class="sidebar col-md-3 vh100 bg-primary justify-content-center text-justify">
                    <h6 class="text-uppercase my-2 text-center">dashbord</h6>
                    <ul class="navbar-nav mr-auto fontBlack">
                        <li id="author" class="nav-item text-capitalize d-flex justify-content-md-between align-items-center mb-md-2"><a href="adminPanelAuthor.php" class="fontBlack">author</a><i class="fas fa-user-edit"></i>
                        </li>
                        <li id="books" class="nav-item d-flex justify-content-md-between align-items-center mb-md-2  text-capitalize"><a href="adminPanelBooks.php" class="fontBlack">books</a><i class="fas fa-book-open"></i></li>
                        <li id="category" class="nav-item d-flex text-capitalize justify-content-md-between align-items-center my-md-2"><a href="adminPanelCategory.php" class="fontBlack">book category</a><i class="fas fa-book"></i>
                        </li>
                        <li id="comments" class="nav-item d-flex justify-content-md-between align-items-center mb-md-2  text-capitalize"><a href="adminPanelComments.php" class="fontBlack">user comments</a><i class="fas fa-comments"></i></li>
                    </ul>
                </div>
                <div class="col-md-9 justify-content-center text-center">
                    <h4 class="text-uppercase my-2 text-center">Public comments</h4>
                    <?php
                        if(isset($_SESSION['error'])) {
                    ?>
                        <div class="error h4 text-danger text-center mt-5"><?= $_SESSION['error']?></div>
                    <?php 
                        unset($_SESSION['error']);
                    }
                    ?>
                    <div class="row">
                        <div id="pendingDiv"  class="col-md-4 border rounded spy1">
                            <h6 class="text-uppercase my-2 text-center text-primary">Pending comments</h6>
                            <div id="pendingOl" class="d-flex flex-column mx-1 my-1 px-0">
                            </div>
                        </div>
                        <div id="approvedDiv"  class="col-md-4 border rounded spy1">
                            <h6 class="text-uppercase my-2 text-center text-success">Aprroved comments</h6>
                            <div id="approvedOl" class="d-flex flex-column mx-1 my-1 px-0">
                            </div>
                        </div>
                        <div id="deletedDiv" class="col-md-4 border rounded spy1s">
                            <h6 class="text-uppercase my-2 text-center text-danger">Deleted comments</h6>
                            <div id="deletedOl" class="d-flex flex-column mx-1 my-1 px-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <?php
        require_once __DIR__ ."/../backEnd/classes/footer.php";
        ?>
        <script src="./js/AaGeneral.js"></script> 
        <script src="./js/publicCommCRUD.js"></script> 
    </body>
</html>