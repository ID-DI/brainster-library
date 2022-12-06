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
    ?>
    <main class="container-fluid">
        <div class="row">
            <div class="sidebar col-md-3 vh100 bg-primary justify-content-center text-justify">
                <h6 class="text-uppercase my-2 text-center">dashbord</h6>
                <ul class="navbar-nav mr-auto fontBlack">
                    <li id="author"
                        class="nav-item text-capitalize d-flex justify-content-md-between align-items-center mb-md-2"><a
                            href="adminPanelAuthor.php" class="fontBlack">author</a><i class="fas fa-user-edit"></i>
                    </li>
                    <li id="books"
                        class="nav-item d-flex justify-content-md-between align-items-center mb-md-2  text-capitalize">
                        <a href="adminPanelBooks.php" class="fontBlack">books</a><i class="fas fa-book-open"></i></li>
                    <li id="category"
                        class="nav-item d-flex text-capitalize justify-content-md-between align-items-center my-md-2"><a
                            href="adminPanelCategory.php" class="fontBlack">book category</a><i class="fas fa-book"></i>
                    </li>
                    <li id="comments"
                        class="nav-item d-flex justify-content-md-between align-items-center mb-md-2  text-capitalize">
                        <a href="adminPanelComments.php" class="fontBlack">user comments</a><i class="fas fa-comments"></i>
                    </li>
                </ul>
            </div>

            <div class="col-md-9 justify-content-md-center text-center">
                <div id="allBooks" class="col-md-12 my-md-1 d-flex justify-content-center flex-column">

                    <div class="row my-md-3">
                        <h3 class="col-md-12 text-center my-0 text-capitalize mb-0">books</h3>
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
                            <input id="searchbar" class="form-control" onkeyup="search_book()" type="text" name="search" placeholder="Search books..">
                        </div>

                        <div class="col-md-12 my-md-2 d-flex">
                            <div id="categoryDiv" class="spy col-md-12 bg-dark border" data-spy="scroll">
                                <ul
                                    class="position-relative row border font-weight-bolder my-0 list-unstyled text-white d-flex">
                                    <span class="col-md-4 text-white text-center mb-0 d-inline-flex text-center">
                                        <span class="mr-5">#</span>
                                    </span>
                                    <span class="ml-5">Books</span>
                                </ul>
                                <ol id="the-list" class="pl-0 mx-0"></ol>
                            </div>
                        </div>
                    </div>

                    <div id="newBooks" class="col-md-10 mx-auto d-none justify-content-center flex-column">
                        <h6 class="text-center">Create new book:</h6>
                        <form id="formNewBooks" action="../backEnd/createNewAuthor.php" method="POST"
                            class="form-group">
                            <div class="row">
                                <div class="col-md-6 mb-1">
                                    <div class="form-group">
                                        <input type="text" class="form-control mb-3" id="inputNewBooksTitle"
                                            name="inputNewBooksTitle" placeholder="Enter new book title">

                                        <select class="form-control" id="inputNewBooksAuthor"
                                            name="inputNewBooksAuthor">
                                            <option value="0" id="inputNewBookAuthorOption">Select author</option>
                                            <?php
                                                $stmt = $pdo->query("SELECT * FROM author WHERE soft_delete='0'");
                                                while($row =$stmt->fetch())
                                                {
                                                echo "<option value = '{$row['id']}'>{$row['author']}</option>";
                                                }
                                            ?>
                                        </select>
                                    </div>
                                    <input type="number" class="form-control" id="inputNewBooksYear"
                                        name="inputNewBooksYear" placeholder="Enter year of publication">
                                </div>

                                <div class="col-md-6 mb-1">
                                    <div class="form-group">
                                        <input type="number" class="form-control" id="inputNewBooksPages"
                                            name="inputNewBooksPages" placeholder="Enter number of pages">
                                    </div>

                                    <input type="text" class="form-control mb-3" id="inputNewBooksImageURL"
                                        name="inputNewBooksImageURL" placeholder="Enter URL for the book cover">

                                    <div class="form-group mb-0">
                                        <select class="form-control mb-5" id="inputNewBooksCategory" name="inputNewBooksCategory">
                                            <option value="0" id="inputNewBooksCategoryOption">Select category</option>
                                            <?php
                                                $stmt = $pdo->query("SELECT * FROM category WHERE soft_delete='0'");
                                                while($row =$stmt->fetch())
                                                {
                                                echo "<option value = '{$row['id']}'>{$row['category']}</option>";
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" id="btnNewBooks" name="btnNewBooks"
                                        class="btn btn-outline-success jusitfy-content-center text-center"
                                        type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div id="editBooksDiv" class="col-md-10 mx-auto d-none justify-content-center flex-column">
                        <h6 class="text-center">Edit category:</h6>
                        <form id="formEditBooks" action="../backEnd/editBooks.php" method="POST"
                        div class="form-group">
                            <div class="row">
                                <div class="col-md-6 mb-1">
                                    <div class="form-group">
                                        <input type="text" class="form-control mb-3" id="inputEditBooksTitle"
                                            name="inputEditBooksTitle" placeholder="Edit a book title">
                                        <input id="inputEditId" type="hidden">
                                        <select class="form-control" id="inputEditBooksAuthor"
                                            name="inputEditBooksAuthor">
                                            <option value="0" id="inputEditBookAuthorOption">Select author</option>
                                            <?php
                                                $stmt = $pdo->query("SELECT * FROM author WHERE soft_delete='0'");
                                                while($row =$stmt->fetch())
                                                {
                                                echo "<option value = '{$row['id']}'>{$row['author']}</option>";
                                                }
                                            ?>
                                        </select>
                                    </div>
                                    <input type="number" class="form-control" id="inputEditBooksYear"
                                        name="inputEditBooksYear" placeholder="Edit the year of the publication">
                                </div>

                                <div class="col-md-6 mb-1">
                                    <div class="form-group">
                                        <input type="number" class="form-control" id="inputEditBooksPages"
                                            name="inputEditBooksPages" placeholder="Edit the number of pages">
                                    </div>

                                    <input type="text" class="form-control mb-3" id="inputEditBooksImageURL"
                                        name="inputEditBooksImageURL" placeholder="Edit the URL for the book cover">

                                    <div class="form-group mb-0">
                                        <select class="form-control mb-5" id="inputEditBooksCategory" name="inputEditBooksCategory">
                                            <option value="0" id="inputEditBooksCategoryOption">Select category</option>
                                            <?php
                                                $stmt = $pdo->query("SELECT * FROM category WHERE soft_delete='0'");
                                                while($row =$stmt->fetch())
                                                {
                                                echo "<option value = '{$row['id']}'>{$row['category']}</option>";
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" id="btnSubmitEditBooks" name="btnSubmitEditBooks"
                                        class="btn btn-outline-success jusitfy-content-center text-center"
                                        type="submit">Submit</button>
                                </div>

                            </div>                  
                        </form>
                    </div>
                    <div id="deleteBooksDiv" class="d-none"></div>
                </div>
            </div>

    </main>
    <?php
    require_once __DIR__ ."/../backEnd/classes/footer.php";
    ?>
    <script src="./js/AaGeneral.js"></script>
    <script src="./js/BooksCRUD.js"></script>
</body>
</html>