-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2022 at 04:33 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oofilipinodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `Filipinoword_translation` varchar(255) NOT NULL,
  `meaning` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dictionary`
--

INSERT INTO `dictionary` (`Filipinoword_translation`, `meaning`) VALUES
('Padangkat', 'refers to the volume of information that can be transmitted or processed. it is measured in bit or bytes per time unit like \"bits per second\".'),
('Datosayan', 'an organized collection of data and services to access them in a variety of ways relevant to data.'),
('Primaryang Tabla', 'the main circuit board generally connecting most major components of a computer such as a CPU, memory, I/O devices.'),
('Paikot', 'a control structure in the code that causes repeated execution of a section of code.'),
('kodigong bukas', 'an application or software which is provided with the source code, usually with for repurposing or augmenting.'),
('esulat', 'refers to secure information and communication techniques derived from mathematical concepts and a set of rule-based calculations called algorithms, to transform messages in ways that are hard to decipher.'),
('pabrikasyon', 'Integrated Development Environment- software for building applications that combines common developer tools into a single graphical user interface.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
