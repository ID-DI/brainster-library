-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2022 at 11:35 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brainster_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(10) UNSIGNED NOT NULL,
  `author` varchar(64) DEFAULT NULL,
  `soft_delete` smallint(5) DEFAULT 0,
  `biography` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `author`, `soft_delete`, `biography`) VALUES
(1, 'Leo Tolstoy', 0, 'Lorem ipsum i taka natamu'),
(2, 'Mark Twain', 1, 'Neque porro quisquam est'),
(3, 'Stephen King', 0, 'Neque porro quisquam est'),
(4, 'George Orwell', 0, 'Neque porro quisquam est'),
(5, 'James Joyce', 1, 'Neque porro quisquam est'),
(6, 'Charles Dickens', 0, 'Neque porro quisquam est'),
(7, 'dante alighieri', 0, 'Neque porro quisquam est'),
(8, 'William Shakespeare', 1, 'Neque porro quisquam est'),
(9, 'Fyodor Dostoevsky', 1, 'Neque porro quisquam est'),
(10, 'Miguel de Cervantes', 0, 'Neque porro quisquam est'),
(11, 'Jules Verne', 0, 'Neque porro quisquam est'),
(12, 'Ernest Hemingway', 0, 'Neque porro quisquam est'),
(13, 'J.R.R. Tolkien', 0, 'Neque porro quisquam est'),
(14, 'John Milton', 1, 'Neque porro quisquam est'),
(15, 'hans christian andersen', 1, 'Neque porro quisquam est'),
(16, 'homer', 1, 'Neque porro quisquam est'),
(17, 'Alexander Pushkin', 1, 'Neque porro quisquam est'),
(18, 'Edgar Allan Poe', 1, 'Neque porro quisquam est'),
(19, 'jane austen', 1, 'Neque porro quisquam est'),
(20, 'stieg larsson', 0, 'Neque porro quisquam est'),
(21, 'vidoe podgorec', 0, 'neggro parrabelum'),
(22, 'gligor prlicev', 0, 'he was born in prilep, ');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(64) NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `year_publication` int(10) UNSIGNED NOT NULL,
  `pages` int(10) UNSIGNED NOT NULL,
  `cover` varchar(128) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `soft_delete` smallint(5) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `year_publication`, `pages`, `cover`, `category_id`, `soft_delete`) VALUES
(1, 'Divine comedy', 7, 1320, 457, 'https://i.ebayimg.com/images/g/WW4AAOSwVxNgABUA/s-l640.jpg', 79, 0),
(2, '1984', 4, 1949, 328, 'https://images-na.ssl-images-amazon.com/images/I/81StSOpmkjL.jpg', 9, 0),
(3, 'Ulysses', 5, 1922, 730, 'https://images-na.ssl-images-amazon.com/images/I/71zSnNvI7dL.jpg', 94, 0),
(4, 'oliver twist', 6, 1838, 528, 'https://kbimages1-a.akamaihd.net/0074106e-4ddd-4fc4-8056-233b6686b030/1200/1200/False/oliver-twist-511.jpg', 2, 0),
(6, 'the old man and the sea', 12, 1952, 127, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSH5OdW9IyRA7yNy0DR1Wvx6-c4ZUjIbcWLJhD-moZ6xylvqtU9', 7, 0),
(7, 'it', 3, 1986, 1138, 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbVZgRR65QJ_Cad7wANF4kseUyFhciIHEI717kL6C9E4xqZ1bo', 6, 0),
(8, 'twenty thousand leagues under the sea', 11, 1870, 426, 'http://prodimage.images-bn.com/pimages/9780553212525_p0_v1_s1200x630.jpg', 9, 0),
(9, 'the silmarillion', 13, 1977, 365, 'https://images-na.ssl-images-amazon.com/images/I/61Q3YdCXGML.jpg', 7, 0),
(10, 'war and peace', 1, 1867, 1225, 'https://images-na.ssl-images-amazon.com/images/I/91FXycpulgL.jpg', 79, 0),
(11, 'the girl with the dragon tattoo', 20, 2005, 672, 'https://www.hachette.co.uk/wp-content/uploads/2019/01/hbg-title-97818472425323.jpg?fit=441%2C675', 109, 0);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category` varchar(64) DEFAULT NULL,
  `soft_delete` smallint(5) UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `soft_delete`) VALUES
(1, 'action & adventure', 1),
(2, 'classics', 0),
(3, 'comic book or graphic novel', 1),
(4, 'detective & mystery', 1),
(5, 'historical fiction', 1),
(6, 'horror', 0),
(7, 'literary fiction', 0),
(8, 'romance', 1),
(9, 'science fiction', 0),
(10, 'short stories', 1),
(11, 'suspense & thrillers', 1),
(12, 'biographies & autobiographies', 1),
(13, 'cookbooks', 1),
(79, 'history', 0),
(83, 'esseys', 1),
(94, 'modernist novel', 0),
(95, 'psychological crimi novel', 1),
(109, 'thriller', 0),
(110, 'thriller', 1),
(111, 'dad', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_comments`
--

CREATE TABLE `personal_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `commentary` varchar(128) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `book_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personal_comments`
--

INSERT INTO `personal_comments` (`id`, `commentary`, `user_id`, `book_id`) VALUES
(1, 'You need to read Ulessys...', 4, 3),
(2, 'Finish reading Dante\'s comedy...', 4, 1),
(5, 'Up to page 252', 4, 3),
(6, 'Up to page 252', 4, 3),
(7, 'What is the old man fishing?', 4, 6),
(8, 'Where is he fishing?', 4, 6),
(9, 'Does he have a perrmit?', 4, 6),
(10, 'Nice book', 4, 4),
(12, 'Beatrice is the love of the poet', 4, 1),
(18, 'start reading, good start', 6, 6),
(29, 'Book about Irish in 18th centery', 6, 3),
(30, 'The new lost Odessys', 6, 3),
(36, 'Scary good book', 4, 2),
(38, 'up to page127', 4, 8),
(39, 'I like the submarin', 4, 8),
(40, 'Maybe it is yellow submarin like the song', 4, 8),
(41, 'How deep is the see really?', 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `public_comments`
--

CREATE TABLE `public_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `commentary` varchar(128) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `status_comm` smallint(5) UNSIGNED DEFAULT 0,
  `book_id` int(10) UNSIGNED DEFAULT NULL,
  `soft_delete` smallint(5) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `public_comments`
--

INSERT INTO `public_comments` (`id`, `commentary`, `user_id`, `status_comm`, `book_id`, `soft_delete`) VALUES
(1, '1984 has come and its predictions came true...sad', 1, 1, 2, 0),
(2, 'How Dante goes though hell for love', 2, 1, 1, 1),
(3, 'The big brother is wathcing us...', 2, 1, 2, 0),
(4, 'Love it ...Dante is great', 1, 1, 1, 1),
(5, 'Political drama in middle ages in Florence', 2, 1, 1, 0),
(9, 'Book about the Irish people around the great fammine in Ireland ...great book', 7, 1, 3, 0),
(46, 'About lonilness in life ', 6, 1, 6, 0),
(57, 'Irish are strong', 6, 0, 3, 0),
(58, 'I was scared...', 4, 1, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `role` smallint(5) UNSIGNED DEFAULT 0,
  `user_name` varchar(64) DEFAULT NULL,
  `passkey` varchar(96) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `user_name`, `passkey`) VALUES
(1, 0, 'VesnaBejbi@gmail.com', '$2y$10$D/2FYhhDhseQd51tro6Td.KJ7eqeU1i9DwQc9e2/VomSovXxhrRYu'),
(2, 0, 'Trajce_Munja@yahoo.com', '$2y$10$LeJzBmMfAotxCYhnRo5pfuM/GNgS0/TahVkptHYh6neg87hB4jIMO'),
(3, 1, 'admin@admin.com', '$2y$10$1EZuZsAU.NFAG0U4tk2pXeXgygNsSANoQDii8yPKsDvI.bBPU5XDq'),
(4, 0, 'ivan12@gmail.com', '$2y$10$BbSKLM0boqDa6YCWsR.LVOc8kXGpH2GNRfwidDb3wHRu2z7NC9WVq'),
(6, 0, 'Monika12@hotmail.com', '$2y$10$4xya6CqdEvRIqLq2zc4SU.NjBsa4sNae4cYYER6jrEqR6kHPTsfI6'),
(7, 0, 'Petar@yahoo.com', '$2y$10$4gCPiYIf1YnLAXfwYsCEne/FpZD3g5fgixUcAy1CROW/.I3AYyQx6'),
(8, 0, 'Vera15@gmail.com', '$2y$10$vQIraP7WHKiU2Ea9DKy.puIxOvdTySPjll2i1zwUWpNj08SCna776'),
(9, 0, 'radmila12@yahoo.com', '$2y$10$02mWU7plcUYZfqmnZ.XOseNW7zVMcnU6OgL.MXXPdKyqFvc4f2h6S');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_comments`
--
ALTER TABLE `personal_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `public_comments`
--
ALTER TABLE `public_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `personal_comments`
--
ALTER TABLE `personal_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `public_comments`
--
ALTER TABLE `public_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personal_comments`
--
ALTER TABLE `personal_comments`
  ADD CONSTRAINT `personal_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `personal_comments_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `public_comments`
--
ALTER TABLE `public_comments`
  ADD CONSTRAINT `public_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `public_comments_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
