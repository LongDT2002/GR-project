-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final_gr
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add association',6,'add_association'),(22,'Can change association',6,'change_association'),(23,'Can delete association',6,'delete_association'),(24,'Can view association',6,'view_association'),(25,'Can add code',7,'add_code'),(26,'Can change code',7,'change_code'),(27,'Can delete code',7,'delete_code'),(28,'Can view code',7,'view_code'),(29,'Can add nonce',8,'add_nonce'),(30,'Can change nonce',8,'change_nonce'),(31,'Can delete nonce',8,'delete_nonce'),(32,'Can view nonce',8,'view_nonce'),(33,'Can add user social auth',9,'add_usersocialauth'),(34,'Can change user social auth',9,'change_usersocialauth'),(35,'Can delete user social auth',9,'delete_usersocialauth'),(36,'Can view user social auth',9,'view_usersocialauth'),(37,'Can add partial',10,'add_partial'),(38,'Can change partial',10,'change_partial'),(39,'Can delete partial',10,'delete_partial'),(40,'Can view partial',10,'view_partial'),(41,'Can add blacklisted token',11,'add_blacklistedtoken'),(42,'Can change blacklisted token',11,'change_blacklistedtoken'),(43,'Can delete blacklisted token',11,'delete_blacklistedtoken'),(44,'Can view blacklisted token',11,'view_blacklistedtoken'),(45,'Can add outstanding token',12,'add_outstandingtoken'),(46,'Can change outstanding token',12,'change_outstandingtoken'),(47,'Can delete outstanding token',12,'delete_outstandingtoken'),(48,'Can view outstanding token',12,'view_outstandingtoken'),(49,'Can add vote',13,'add_vote'),(50,'Can change vote',13,'change_vote'),(51,'Can delete vote',13,'delete_vote'),(52,'Can view vote',13,'view_vote'),(53,'Can add account',14,'add_account'),(54,'Can change account',14,'change_account'),(55,'Can delete account',14,'delete_account'),(56,'Can view account',14,'view_account'),(57,'Can add actor',15,'add_actor'),(58,'Can change actor',15,'change_actor'),(59,'Can delete actor',15,'delete_actor'),(60,'Can view actor',15,'view_actor'),(61,'Can add actor image',16,'add_actorimage'),(62,'Can change actor image',16,'change_actorimage'),(63,'Can delete actor image',16,'delete_actorimage'),(64,'Can view actor image',16,'view_actorimage'),(65,'Can add director',17,'add_director'),(66,'Can change director',17,'change_director'),(67,'Can delete director',17,'delete_director'),(68,'Can view director',17,'view_director'),(69,'Can add director image',18,'add_directorimage'),(70,'Can change director image',18,'change_directorimage'),(71,'Can delete director image',18,'delete_directorimage'),(72,'Can view director image',18,'view_directorimage'),(73,'Can add genre',19,'add_genre'),(74,'Can change genre',19,'change_genre'),(75,'Can delete genre',19,'delete_genre'),(76,'Can view genre',19,'view_genre'),(77,'Can add movie',20,'add_movie'),(78,'Can change movie',20,'change_movie'),(79,'Can delete movie',20,'delete_movie'),(80,'Can view movie',20,'view_movie'),(81,'Can add movie image',21,'add_movieimage'),(82,'Can change movie image',21,'change_movieimage'),(83,'Can delete movie image',21,'delete_movieimage'),(84,'Can view movie image',21,'view_movieimage'),(85,'Can add movie video',22,'add_movievideo'),(86,'Can change movie video',22,'change_movievideo'),(87,'Can delete movie video',22,'delete_movievideo'),(88,'Can view movie video',22,'view_movievideo'),(89,'Can add movie_ actor',23,'add_movie_actor'),(90,'Can change movie_ actor',23,'change_movie_actor'),(91,'Can delete movie_ actor',23,'delete_movie_actor'),(92,'Can view movie_ actor',23,'view_movie_actor'),(93,'Can add movie_ genre',24,'add_movie_genre'),(94,'Can change movie_ genre',24,'change_movie_genre'),(95,'Can delete movie_ genre',24,'delete_movie_genre'),(96,'Can view movie_ genre',24,'view_movie_genre'),(97,'Can add rate',25,'add_rate'),(98,'Can change rate',25,'change_rate'),(99,'Can delete rate',25,'delete_rate'),(100,'Can view rate',25,'view_rate'),(101,'Can add review',26,'add_review'),(102,'Can change review',26,'change_review'),(103,'Can delete review',26,'delete_review'),(104,'Can view review',26,'view_review'),(105,'Can add vote',27,'add_vote'),(106,'Can change vote',27,'change_vote'),(107,'Can delete vote',27,'delete_vote'),(108,'Can view vote',27,'view_vote'),(109,'Can add profile',28,'add_profile'),(110,'Can change profile',28,'change_profile'),(111,'Can delete profile',28,'delete_profile'),(112,'Can view profile',28,'view_profile'),(113,'Can add watchlist',29,'add_watchlist'),(114,'Can change watchlist',29,'change_watchlist'),(115,'Can delete watchlist',29,'delete_watchlist'),(116,'Can view watchlist',29,'view_watchlist'),(117,'Can add watchlist_ movie',30,'add_watchlist_movie'),(118,'Can change watchlist_ movie',30,'change_watchlist_movie'),(119,'Can delete watchlist_ movie',30,'delete_watchlist_movie'),(120,'Can view watchlist_ movie',30,'view_watchlist_movie');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 13:16:18
