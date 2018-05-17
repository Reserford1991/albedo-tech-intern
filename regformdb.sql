-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Фев 01 2018 г., 10:39
-- Версия сервера: 5.7.21-0ubuntu0.16.04.1
-- Версия PHP: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `regformdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `surname` varchar(256) NOT NULL,
  `birthdate` int(32) NOT NULL,
  `report` tinytext NOT NULL,
  `country` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `company` varchar(256) DEFAULT NULL,
  `position` varchar(256) DEFAULT NULL,
  `about` tinytext,
  `photo` varchar(256) DEFAULT NULL,
  `created_at` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
