-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-11-14 09:56:37
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `mes`
--

-- --------------------------------------------------------

--
-- 表的结构 `inspection`
--

CREATE TABLE `inspection` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(100) NOT NULL,
  `defect` tinyint(1) NOT NULL,
  `total_produced` int(11) DEFAULT NULL,
  `total_defected` int(11) DEFAULT NULL,
  `defect_details` varchar(200) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `inspection`
--

INSERT INTO `inspection` (`id`, `title`, `date`, `status`, `defect`, `total_produced`, `total_defected`, `defect_details`, `updated_at`, `created_at`) VALUES
(8, 'T-Shirt for XXX company', '2024-11-05', 'Completed', 1, 200, 20, 'irregular hemming, loose buttons, raw edges', '2024-11-14 08:31:44', '2024-11-14 08:23:20'),
(9, 'Wallet for ABC company', '2024-11-06', 'Completed', 1, 200, 5, 'zipper problem', '2024-11-14 08:31:48', '2024-11-14 08:24:33'),
(10, 'Plastic Bag for BBB company', '2024-11-01', 'Scheduled', 0, NULL, NULL, NULL, NULL, '2024-11-14 08:25:18'),
(12, 'Shoes P0021', '2024-11-09', 'Scheduled', 0, NULL, NULL, NULL, NULL, '2024-11-14 08:26:41');

-- --------------------------------------------------------

--
-- 表的结构 `metrics`
--

CREATE TABLE `metrics` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `metrics`
--

INSERT INTO `metrics` (`id`, `title`, `value`, `updated_at`, `created_at`) VALUES
(2, 'Production Status', 'Operational', NULL, '2024-11-12 12:12:08'),
(4, 'Machine Utilization', '85', NULL, '2024-11-12 12:12:08');

-- --------------------------------------------------------

--
-- 表的结构 `production`
--

CREATE TABLE `production` (
  `id` int(11) NOT NULL,
  `batch_number` varchar(100) DEFAULT NULL,
  `product_name` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `production`
--

INSERT INTO `production` (`id`, `batch_number`, `product_name`, `status`, `quantity`, `date`, `updated_at`, `created_at`) VALUES
(11, 'P0001', 'Shoes', 'In-Progress', 1000, '2024-11-01', NULL, '2024-11-14 08:21:57'),
(12, 'P0102', 'Pen', 'In-Progress', 10000, '2024-11-05', NULL, '2024-11-14 08:22:36'),
(13, 'P002', 'Bag', 'Scheduled', 200, '2024-11-13', NULL, '2024-11-14 08:22:53'),
(14, 'PJ0021', 'Jacket ', 'In-Progress', 2000, '2024-10-29', NULL, '2024-11-14 08:48:07');

--
-- 转储表的索引
--

--
-- 表的索引 `inspection`
--
ALTER TABLE `inspection`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `metrics`
--
ALTER TABLE `metrics`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `production`
--
ALTER TABLE `production`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `inspection`
--
ALTER TABLE `inspection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `metrics`
--
ALTER TABLE `metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `production`
--
ALTER TABLE `production`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
