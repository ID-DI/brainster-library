<?php
require_once __DIR__ . "../../backEnd/classes/header.php";
// if(!isset($_SESSION['admin']))
// {
//     header("Location:../frontEnd/index.php");
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
                
                <div class="col-md-9 justify-content-md-center text-center">
                    <div id="allCategories" class="col-md-12 my-md-1 d-flex justify-content-center flex-column">
   
                        <div class="row my-md-3">
                            <h3 class="col-md-12 text-center my-0 text-capitalize mb-0">authors</h3>
                            <?php
                                if(isset($_SESSION['error'])) {
                            ?>
                                <div class="error h4 text-danger text-center mt-5"><?= $_SESSION['error']?></div>
                            <?php 
                                unset($_SESSION['error']);
                                }
                            ?>
                        </div>
                        <div class="row my-0">
                            <div class="col-md-5">
                                <input id="searchCategory" type="search" class="form-control" onkeyup="searchCategory()"  placeholder="Search...">
                            </div>

                            <div class="col-md-12 my-md-2 d-flex">
                                <div id="categoryDiv" class="spy col-md-12 bg-dark border" data-spy="scroll">
                                    <ul class="position-relative row border font-weight-bolder my-0 list-unstyled text-white d-flex">
                                        <span class="col-md-4 text-white text-center mb-0 d-inline-flex text-center">
                                        <span class="mr-5">#</span>
                                        <span class="mr-5 ml-1">Action</span>
                                        </span>
                                        <span class="ml-5">Author</span>
                                    </ul>
                                    <ol id="the-list" class="pl-0 mx-3"></ol>
                                </div>
                            </div>
                        </div>
                        <div id="newCategory" class="col-md-12 d-none justify-content-center flex-column">
                        <h6 class="text-left">Create new category:</h6>
                            <form id="formNewAuthor" action="../backEnd/createNewAuthor.php" method="POST" class="form-group">
                                <div class="mb-3 d-flex flex-column form-group">
                                    <input type="text" class="form-control mb-1" id="inputNewAuthor" name="inputNewAuthor" placeholder="Enter new author">
                                    <input type="text" class="form-control mb-1" id="inputNewAuthorBiography" name="inputNewAuthorBiography" placeholder="Bio...">
                                    <button type="submit" id="btnNewAuthor" name="btnNewAuthor" class="btn btn-outline-success" type="submit">Submit</button>

                                </div>
                            </form>
                        </div>
                        <div id="editCategoryDiv" class="d-none flex-column justify-content-md-start w-100">
                            <h6 class="text-left mb-2">Edit category:</h6>
                            <form id="formEditCategory" action="../backEnd/editCategory.php" method="POST">
                                <div class="mb-3 d-flex flex-column form-group">
                                    
                                    <input id="inputEditAuthor" type="text" class="w-100 form-control mb-1" placeholder="Author">
                                    <input id="inputEditId" type="hidden">
                                    <input id="inputEditBiography" type="text" class="w-100 form-control mb-1" placeholder="Bio...">
                                    <button id="btnSubmitEditAuthor" type="submit" class="btn btn-outline-warning btn-sm" type="button">Edit</button>
      
                                </div>
                            </form>
                        </div>
                        <div id="deleteCategoryDiv" class="d-none"></div>
                    </div>
            </div>

        </main>
        <?php
        require_once __DIR__ ."/../backEnd/classes/footer.php";
        ?>
        <script src="./js/AaGeneral.js"></script> 
        <script src="./js/AuthorsCRUD.js"></script> 
    </body>
</html>