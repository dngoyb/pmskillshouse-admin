-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 18, 2018 at 12:28 AM
-- Server version: 5.7.23
-- PHP Version: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmskillshouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `assessment_id` int(50) UNSIGNED NOT NULL,
  `pre_feedback` varchar(200) DEFAULT NULL,
  `question_id` int(50) UNSIGNED NOT NULL,
  `trainee_id` int(50) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(50) UNSIGNED NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `course_description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `course_description`) VALUES
(1, 'Testing', 'Record added fpr testing purposes'),
(2, 'Test2', 'Testing two'),
(3, 'Test3', 'Testing three');

-- --------------------------------------------------------

--
-- Table structure for table `postassessment`
--

CREATE TABLE `postassessment` (
  `postAssessment_id` int(50) NOT NULL,
  `post_feedback` varchar(200) DEFAULT NULL,
  `question_id` int(50) UNSIGNED NOT NULL,
  `trainee_id` int(50) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(50) UNSIGNED NOT NULL,
  `pre_question` varchar(500) NOT NULL,
  `post_question` varchar(500) NOT NULL,
  `question_type` int(50) NOT NULL,
  `course_id` int(50) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `pre_question`, `post_question`, `question_type`, `course_id`) VALUES
(1, 'I clearly understand the meaning of the term income.', 'I clearly understand the meaning of the term income.', 1, 1),
(2, 'I know the difference between gross and net income.', 'I know the difference between gross and net income.', 1, 1),
(21, '', 'Feedback on the facilitator', 2, 1),
(22, '', 'Feedback on the workshop', 2, 1),
(23, '', 'Do you require financial advise?', 1, 1),
(24, '', 'Do you require a credit report?', 1, 1),
(25, '', 'Do you require a will?', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trainee`
--

CREATE TABLE `trainee` (
  `trainee_id` int(50) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `identity_number` varchar(50) DEFAULT NULL,
  `signature` varchar(10000) NOT NULL,
  `username` varchar(5000) NOT NULL,
  `user_id` int(50) UNSIGNED NOT NULL,
  `training_id` int(50) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trainee`
--

INSERT INTO `trainee` (`trainee_id`, `first_name`, `last_name`, `gender`, `phone_number`, `address`, `date_of_birth`, `identity_number`, `signature`, `username`, `user_id`, `training_id`) VALUES
(53, 'Ntombi', 'Sikhosana', 'Other', '98765467', 'Joburg', '2004-06-09', '9876543456', 'Photos/signatures/1544777125931-hpt11lu5akj.png', 'ntombisikhosana', 176, 82),
(54, 'asdfvgbn', 'dfgh', 'Other', 'sdfg', 'esdfgh', '2009-12-18', 'fg', 'Photos/signatures/1545121594570-iw18zc2dkag.png', 'asdfvgbndfgh', 176, 94);

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_id` int(50) UNSIGNED NOT NULL,
  `training_location` varchar(100) NOT NULL,
  `training_date` date NOT NULL,
  `image` varchar(500) NOT NULL,
  `course_id` int(50) UNSIGNED NOT NULL,
  `user_id` int(50) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`training_id`, `training_location`, `training_date`, `image`, `course_id`, `user_id`) VALUES
(55, 'Testing', '2018-12-12', 'Testing', 3, 176),
(56, 'asdf', '2018-12-12', 'asdf', 1, 176),
(57, 'qwer', '2018-12-13', 'qwe', 3, 176),
(58, 'sdf', '2018-12-13', 'wedf', 3, 176),
(59, 'ygf', '2018-12-13', 'tgf', 3, 176),
(60, 'asd', '2018-12-13', 'asdf', 1, 176),
(61, 'sd', '2018-12-13', 'wd', 1, 176),
(62, 'asdf', '2018-12-13', 'asdf', 1, 176),
(63, 'aq', '2018-12-13', 'ws', 1, 176),
(64, 'qwedf', '2018-12-13', 'wsedf', 1, 176),
(65, 'swdefg', '2018-12-13', 'def', 3, 176),
(66, 'asdf', '2018-12-13', 'sdfg', 1, 176),
(67, 'zxc', '2018-12-13', 'sdf', 2, 176),
(68, 'asd', '2018-12-13', 'asdcf', 1, 176),
(69, 'asd', '2018-12-13', 'szxdc', 1, 176),
(70, 'last test', '2018-12-13', 'last test', 3, 176),
(71, 'uhgfgh', '2018-12-13', 'oijuhgf', 3, 176),
(72, 'dfgh', '2018-12-13', 'dfg', 1, 176),
(73, 'qswdf', '2018-12-13', 'sdf', 3, 176),
(74, 'sdfg', '2018-12-13', 'sdf', 1, 176),
(75, 'sdf', '2018-12-13', 'asdf', 1, 176),
(76, 'sd', '2018-12-13', 'asd', 1, 176),
(77, 'ascd', '2018-12-13', 'cdv', 3, 176),
(78, 'dfg', '2018-12-13', 'sdfgv', 3, 176),
(79, 'sdcfv', '2018-12-13', 'zxcvb', 1, 176),
(80, 'asd', '2018-12-13', 'asdx', 1, 176),
(81, 'location', '2018-12-14', 'image', 3, 176),
(82, 'location', '2018-12-14', 'training', 1, 176),
(83, 'asdcf', '2018-12-14', 'sdcfvb', 2, 176),
(84, 'sdf', '2018-12-14', 'asdfc', 1, 176),
(85, 'ascd', '2018-12-14', 'sdcf', 3, 176),
(86, 'sdfcvb', '2018-12-14', 'dfcvb', 2, 176),
(87, '`xzc', '2018-12-14', 'asdf', 1, 176),
(88, 'dvf', '2018-12-14', 'sdfg', 3, 176),
(89, 'asdf', '2018-12-14', 'sdfc', 1, 176),
(90, 'sdfcv', '2018-12-14', 'dvb', 3, 176),
(91, 'sdf', '2018-12-14', 'sdfg', 1, 176),
(92, 'juuhg', '2018-12-14', 'olikuj', 1, 176),
(93, 'fgh', '2018-12-18', 'hgjk', 1, 176),
(94, 'sdf', '2018-12-18', 'df', 1, 176);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(50) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `identity_number` varchar(50) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `date_of_birth` date NOT NULL,
  `employee_number` int(20) UNSIGNED NOT NULL,
  `role` int(5) UNSIGNED NOT NULL,
  `password` varchar(5000) NOT NULL,
  `confirm_password` varchar(5000) DEFAULT NULL,
  `code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `gender`, `email`, `identity_number`, `phone_number`, `address`, `created_date`, `date_of_birth`, `employee_number`, `role`, `password`, `confirm_password`, `code`) VALUES
(176, 'Ntombi', 'Sikhosana', NULL, 'pmskillshouse@gmail.com', '98765434567', '098765434567', 'Joburg', '2018-12-08', '2018-12-25', 8888, 2, '$2b$08$31HxlZoN.kGgmobQVy6rh.ynRUd/Q6CvpriWQSJ9Mlg9bgOUMdxfq', NULL, 585554),
(177, 'Ntombi', 'Sikhosana', NULL, 'sikh.kayise@gmail.com', '98765434567', '098765434567', 'Joburg', '2018-12-08', '2018-12-25', 8888, 2, '$2b$08$cNs3aYqdPOJV5cOUJVgBPu3KxDkyHJuSHRe86pnSYSb9bdCsbs9ce', NULL, 464362);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`assessment_id`),
  ADD KEY `FK_assessment_trainee` (`trainee_id`),
  ADD KEY `FK_assessment_question` (`question_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `postassessment`
--
ALTER TABLE `postassessment`
  ADD PRIMARY KEY (`postAssessment_id`),
  ADD KEY `FK_postassessment_question` (`question_id`),
  ADD KEY `FK_postassessment_trainee` (`trainee_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `FK_question_course` (`course_id`);

--
-- Indexes for table `trainee`
--
ALTER TABLE `trainee`
  ADD PRIMARY KEY (`trainee_id`),
  ADD KEY `FK_trainee_user` (`user_id`),
  ADD KEY `FK_trainee_training` (`training_id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`),
  ADD KEY `FK_training_user` (`user_id`),
  ADD KEY `FK_training_course` (`course_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment`
--
ALTER TABLE `assessment`
  MODIFY `assessment_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `postassessment`
--
ALTER TABLE `postassessment`
  MODIFY `postAssessment_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `trainee`
--
ALTER TABLE `trainee`
  MODIFY `trainee_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `FK_assessment_question` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_assessment_trainee` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`trainee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `postassessment`
--
ALTER TABLE `postassessment`
  ADD CONSTRAINT `FK_postassessment_question` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_postassessment_trainee` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`trainee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_question_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trainee`
--
ALTER TABLE `trainee`
  ADD CONSTRAINT `FK_trainee_training` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_trainee_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `training`
--
ALTER TABLE `training`
  ADD CONSTRAINT `FK_training_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_training_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
