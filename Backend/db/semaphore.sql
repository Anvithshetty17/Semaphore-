-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2025 at 07:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `semaphore`
--

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE `college` (
  `collegeId` varchar(255) NOT NULL,
  `collegeName` varchar(255) NOT NULL,
  `collegeLocation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`collegeId`, `collegeName`, `collegeLocation`) VALUES
('c1', 'Test College', 'Test City');

-- --------------------------------------------------------

--
-- Table structure for table `eventheads`
--

CREATE TABLE `eventheads` (
  `eventHeadId` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `eventId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventmembers`
--

CREATE TABLE `eventmembers` (
  `eventMemberId` varchar(255) NOT NULL,
  `memberName` varchar(255) NOT NULL,
  `memberPhoneNumber` varchar(255) NOT NULL,
  `eventTeamEventTeamId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventrules`
--

CREATE TABLE `eventrules` (
  `eventRulesId` varchar(255) NOT NULL,
  `eventRule` varchar(255) NOT NULL,
  `ruleNo` int(11) NOT NULL,
  `eventId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` varchar(255) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventLogoUrl` varchar(255) NOT NULL,
  `memberCount` int(11) NOT NULL,
  `noOfRounds` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `orderNo` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `currentRound` int(11) NOT NULL,
  `modelName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `eventName`, `eventLogoUrl`, `memberCount`, `noOfRounds`, `title`, `orderNo`, `description`, `currentRound`, `modelName`) VALUES
('e1111111-1111-4111-8111-111111111111', 'Earth', '/earth.glb', 5, 3, 'Earth Challenge', 1, 'Navigate the Earth course and complete rounds.', 1, 'earth.glb'),
('e2222222-2222-4222-8222-222222222222', 'Mars', '/mars.glb', 4, 2, 'Mars Mission', 2, 'Solve Mars-themed puzzles across rounds.', 1, 'mars.glb'),
('e3333333-3333-4333-8333-333333333333', 'Jupiter', '/jupiter.glb', 6, 3, 'Jupiter Jam', 3, 'Team-based challenges focused on Jupiter tasks.', 1, 'jupiter.glb'),
('e4444444-4444-4444-8444-444444444444', 'Mercury', '/mercury.glb', 3, 2, 'Mercury Dash', 4, 'Speed and accuracy rounds near Mercury.', 1, 'mercury.glb'),
('e5555555-5555-4555-8555-555555555555', 'Neptune', '/neptune.glb', 5, 3, 'Neptune Voyage', 5, 'Exploration and logic rounds themed on Neptune.', 1, 'neptune.glb');

-- --------------------------------------------------------

--
-- Table structure for table `eventteams`
--

CREATE TABLE `eventteams` (
  `eventTeamId` varchar(255) NOT NULL,
  `currentRound` int(11) NOT NULL,
  `registrationRegistrationId` varchar(255) DEFAULT NULL,
  `eventEventId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1730918973730, 'Migration11730918973730');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notificationId` varchar(255) NOT NULL,
  `notificationTitle` varchar(255) NOT NULL,
  `notificationContent` varchar(255) NOT NULL,
  `isRead` tinyint(4) NOT NULL DEFAULT 0,
  `notificationTime` varchar(255) NOT NULL,
  `userUserId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notificationId`, `notificationTitle`, `notificationContent`, `isRead`, `notificationTime`, `userUserId`) VALUES
('n1', 'Welcome', 'Welcome to Semaphore!', 0, '2025-08-16 20:02:01', 'a1');

-- --------------------------------------------------------

--
-- Table structure for table `paymentdetails`
--

CREATE TABLE `paymentdetails` (
  `paymentDetailsId` varchar(255) NOT NULL,
  `accountHolderName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `upiId` varchar(255) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `statusStatusId` varchar(36) DEFAULT NULL,
  `registrationRegistrationId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paymentdetails`
--

INSERT INTO `paymentdetails` (`paymentDetailsId`, `accountHolderName`, `phoneNumber`, `upiId`, `transactionId`, `remarks`, `statusStatusId`, `registrationRegistrationId`) VALUES
('p1', 'Participant One', '9000000001', 'test@upi', 'txn123', 'Test Payment', 's1', 'r1');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registrationId` varchar(255) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `isPaid` tinyint(4) NOT NULL DEFAULT 0,
  `isTeamReported` tinyint(4) NOT NULL DEFAULT 0,
  `userUserId` varchar(36) DEFAULT NULL,
  `collegeCollegeId` varchar(255) DEFAULT NULL,
  `statusStatusId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registrationId`, `teamName`, `isPaid`, `isTeamReported`, `userUserId`, `collegeCollegeId`, `statusStatusId`) VALUES
('4c28a456-3b4d-4734-b0b7-63f897ba3b13', 'sa', 0, 0, '0f58e96f-a0bd-4af7-a2b8-f5978936fa2a', 'c1', NULL),
('r1', 'Team Alpha', 1, 0, 'a1', 'c1', 's1');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `statusId` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`statusId`, `status`) VALUES
('s1', 'active'),
('s2', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `teamscores`
--

CREATE TABLE `teamscores` (
  `eventScoreId` varchar(255) NOT NULL,
  `roundNo` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `eventTeamEventTeamId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isEmailValid` tinyint(4) NOT NULL DEFAULT 0,
  `phoneNumber` varchar(15) NOT NULL,
  `userTypeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `fullName`, `email`, `password`, `isEmailValid`, `phoneNumber`, `userTypeId`) VALUES
('0f58e96f-a0bd-4af7-a2b8-f5978936fa2a', 'mrnayak27', 'Anup Nayak', 'mrnayak27@gmail.com', '$2b$12$hlRdltCXAhTAfTRgXZP5vuxNQe7QVIY4kEskY2N7GbrtlX3Rulqw6', 1, '9480220586', '4'),
('a1', 'participant1', 'Participant One', 'participant1@example.com', '$2b$10$7QJ8Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 1, '9000000001', '11111111-1111-1111-1111-111111111111');

-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `userTypeId` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `orderNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertypes`
--

INSERT INTO `usertypes` (`userTypeId`, `userType`, `orderNo`) VALUES
('11111111-1111-1111-1111-111111111111', 'participant', 6),
('2', 'super user', 1),
('3', 'event head', 4),
('4', 'admin', 2),
('5', 'registration committe', 8),
('6', 'accolades', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`collegeId`),
  ADD UNIQUE KEY `IDX_fbcd3efed89e4c9394d8a9b935` (`collegeName`);

--
-- Indexes for table `eventheads`
--
ALTER TABLE `eventheads`
  ADD PRIMARY KEY (`eventHeadId`),
  ADD KEY `FK_2008b0c461ba0f3d3b12d1db37d` (`userId`),
  ADD KEY `FK_347b36c07ba93c29a627a85904e` (`eventId`);

--
-- Indexes for table `eventmembers`
--
ALTER TABLE `eventmembers`
  ADD PRIMARY KEY (`eventMemberId`),
  ADD KEY `FK_55bdf2d36e5424b1af9a932bdea` (`eventTeamEventTeamId`);

--
-- Indexes for table `eventrules`
--
ALTER TABLE `eventrules`
  ADD PRIMARY KEY (`eventRulesId`),
  ADD KEY `FK_2b64e2ebdfb7d4e26c522fd8ac2` (`eventId`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`),
  ADD UNIQUE KEY `IDX_7cb8baf2bc816197e4783276e7` (`eventName`),
  ADD UNIQUE KEY `IDX_499f6a440106979a4b063f006d` (`orderNo`);

--
-- Indexes for table `eventteams`
--
ALTER TABLE `eventteams`
  ADD PRIMARY KEY (`eventTeamId`),
  ADD KEY `FK_ef3a367a5396f2b76ce1893d1bf` (`registrationRegistrationId`),
  ADD KEY `FK_80b3f2546ef5e6ee8633d0f19f0` (`eventEventId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationId`),
  ADD KEY `FK_2f8247063f508baf729646a5c21` (`userUserId`);

--
-- Indexes for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD PRIMARY KEY (`paymentDetailsId`),
  ADD KEY `FK_d64810cc06ab349ee520dd58cb6` (`statusStatusId`),
  ADD KEY `FK_6a79342cd539b0a0e53f931be10` (`registrationRegistrationId`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registrationId`),
  ADD UNIQUE KEY `REL_21f9d3a7c95fb62167295cd5ae` (`userUserId`),
  ADD KEY `FK_28d6fd800398b22f7d36e2f3eda` (`collegeCollegeId`),
  ADD KEY `FK_93dfdbc3bcd26d0ebffe5043d86` (`statusStatusId`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`statusId`);

--
-- Indexes for table `teamscores`
--
ALTER TABLE `teamscores`
  ADD PRIMARY KEY (`eventScoreId`),
  ADD KEY `FK_32dc8274831b752f98c24af81b2` (`eventTeamEventTeamId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `IDX_ffc81a3b97dcbf8e320d5106c0` (`username`),
  ADD UNIQUE KEY `IDX_3c3ab3f49a87e6ddb607f3c494` (`email`),
  ADD KEY `FK_f715471331b9b7c81642e2d3b87` (`userTypeId`);

--
-- Indexes for table `usertypes`
--
ALTER TABLE `usertypes`
  ADD PRIMARY KEY (`userTypeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `eventheads`
--
ALTER TABLE `eventheads`
  ADD CONSTRAINT `FK_2008b0c461ba0f3d3b12d1db37d` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_347b36c07ba93c29a627a85904e` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventmembers`
--
ALTER TABLE `eventmembers`
  ADD CONSTRAINT `FK_55bdf2d36e5424b1af9a932bdea` FOREIGN KEY (`eventTeamEventTeamId`) REFERENCES `eventteams` (`eventTeamId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventrules`
--
ALTER TABLE `eventrules`
  ADD CONSTRAINT `FK_2b64e2ebdfb7d4e26c522fd8ac2` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventteams`
--
ALTER TABLE `eventteams`
  ADD CONSTRAINT `FK_80b3f2546ef5e6ee8633d0f19f0` FOREIGN KEY (`eventEventId`) REFERENCES `events` (`eventId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ef3a367a5396f2b76ce1893d1bf` FOREIGN KEY (`registrationRegistrationId`) REFERENCES `registration` (`registrationId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK_2f8247063f508baf729646a5c21` FOREIGN KEY (`userUserId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD CONSTRAINT `FK_6a79342cd539b0a0e53f931be10` FOREIGN KEY (`registrationRegistrationId`) REFERENCES `registration` (`registrationId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d64810cc06ab349ee520dd58cb6` FOREIGN KEY (`statusStatusId`) REFERENCES `status` (`statusId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `FK_21f9d3a7c95fb62167295cd5ae2` FOREIGN KEY (`userUserId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_28d6fd800398b22f7d36e2f3eda` FOREIGN KEY (`collegeCollegeId`) REFERENCES `college` (`collegeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_93dfdbc3bcd26d0ebffe5043d86` FOREIGN KEY (`statusStatusId`) REFERENCES `status` (`statusId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `teamscores`
--
ALTER TABLE `teamscores`
  ADD CONSTRAINT `FK_32dc8274831b752f98c24af81b2` FOREIGN KEY (`eventTeamEventTeamId`) REFERENCES `eventteams` (`eventTeamId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_f715471331b9b7c81642e2d3b87` FOREIGN KEY (`userTypeId`) REFERENCES `usertypes` (`userTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
