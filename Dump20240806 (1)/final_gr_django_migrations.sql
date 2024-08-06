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
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-07-01 13:37:42.637917'),(2,'contenttypes','0002_remove_content_type_name','2024-07-01 13:37:42.678055'),(3,'auth','0001_initial','2024-07-01 13:37:42.819724'),(4,'auth','0002_alter_permission_name_max_length','2024-07-01 13:37:42.858334'),(5,'auth','0003_alter_user_email_max_length','2024-07-01 13:37:42.862282'),(6,'auth','0004_alter_user_username_opts','2024-07-01 13:37:42.862282'),(7,'auth','0005_alter_user_last_login_null','2024-07-01 13:37:42.862282'),(8,'auth','0006_require_contenttypes_0002','2024-07-01 13:37:42.862282'),(9,'auth','0007_alter_validators_add_error_messages','2024-07-01 13:37:42.862282'),(10,'auth','0008_alter_user_username_max_length','2024-07-01 13:37:42.877925'),(11,'auth','0009_alter_user_last_name_max_length','2024-07-01 13:37:42.877925'),(12,'auth','0010_alter_group_name_max_length','2024-07-01 13:37:42.895463'),(13,'auth','0011_update_proxy_permissions','2024-07-01 13:37:42.901621'),(14,'auth','0012_alter_user_first_name_max_length','2024-07-01 13:37:42.906495'),(15,'Account','0001_initial','2024-07-01 13:37:43.083273'),(16,'Actor','0001_initial','2024-07-01 13:37:43.083273'),(17,'Actor','0002_rename_first_name_actor_name_and_more','2024-07-01 13:37:43.173225'),(18,'Actor','0003_remove_actor_image_alter_actor_place_of_birth','2024-07-01 13:37:43.201435'),(19,'Actor','0004_alter_actorimage_actor','2024-07-01 13:37:43.219081'),(20,'Director','0001_initial','2024-07-01 13:37:43.230391'),(21,'Director','0002_rename_birth_place_director_place_of_birth_and_more','2024-07-01 13:37:43.310843'),(22,'Director','0003_alter_director_name_alter_director_place_of_birth','2024-07-01 13:37:43.359134'),(23,'Director','0004_alter_director_name_alter_director_place_of_birth','2024-07-01 13:37:43.401906'),(24,'Director','0005_alter_director_place_of_birth','2024-07-01 13:37:43.410762'),(25,'Director','0006_remove_director_image','2024-07-01 13:37:43.426401'),(26,'Director','0007_alter_directorimage_director','2024-07-01 13:37:43.426401'),(27,'Movie','0001_initial','2024-07-01 13:37:43.715587'),(28,'Movie','0002_movie_budget_movie_original_country_movie_revenue','2024-07-01 13:37:43.819297'),(29,'Movie','0003_remove_trailer_movie_alter_movie_synopsis_movieimage_and_more','2024-07-01 13:37:43.967241'),(30,'Movie','0004_alter_movieimage_type','2024-07-01 13:37:43.979747'),(31,'Movie','0005_remove_movie_actors_remove_movie_genres_movie_actor_and_more','2024-07-01 13:37:44.161067'),(32,'Movie','0006_rename_character_movie_actor_character_name','2024-07-01 13:37:44.178650'),(33,'Movie','0007_alter_movie_director_alter_movie_genre_movie_and_more','2024-07-01 13:37:44.198477'),(34,'Movie','0008_alter_movie_director_alter_movie_actor_movie_and_more','2024-07-01 13:37:44.218194'),(35,'Movie','0009_alter_movie_actor_actor_alter_movievideo_type','2024-07-01 13:37:44.227424'),(36,'Profile','0001_initial','2024-07-01 13:37:44.292548'),(37,'Profile','0002_rename_user_profile','2024-07-01 13:37:44.325379'),(38,'Profile','0003_alter_profile_country','2024-07-01 13:37:44.369291'),(39,'Profile','0004_alter_profile_country','2024-07-01 13:37:44.410418'),(40,'Profile','0005_alter_profile_first_name_alter_profile_last_name','2024-07-01 13:37:44.473202'),(41,'Rate','0001_initial','2024-07-01 13:37:44.556069'),(42,'Rate','0002_alter_rate_rate','2024-07-01 13:37:44.569837'),(43,'Rate','0003_rate_timestamp','2024-07-01 13:37:44.580562'),(44,'Rate','0004_alter_rate_timestamp','2024-07-01 13:37:44.596696'),(45,'Review','0001_initial','2024-07-01 13:37:44.678875'),(46,'Review','0002_rename_review_review_content_review_num_vote_down_and_more','2024-07-01 13:37:44.899238'),(47,'Review','0003_review_timestamp','2024-07-01 13:37:44.921109'),(48,'Review','0004_remove_review_num_vote_down_and_more','2024-07-01 13:37:45.113057'),(49,'Review','0005_remove_vote_timestamp','2024-07-01 13:37:45.135112'),(50,'Watchlist','0001_initial','2024-07-01 13:37:45.180172'),(51,'Watchlist','0002_rename_user_watchlist_account_watchlist_movie','2024-07-01 13:37:45.329559'),(52,'admin','0001_initial','2024-07-01 13:37:45.414050'),(53,'admin','0002_logentry_remove_auto_add','2024-07-01 13:37:45.429689'),(54,'admin','0003_logentry_add_action_flag_choices','2024-07-01 13:37:45.448516'),(55,'sessions','0001_initial','2024-07-01 13:37:45.476924'),(56,'default','0001_initial','2024-07-01 13:37:45.616084'),(57,'social_auth','0001_initial','2024-07-01 13:37:45.616084'),(58,'default','0002_add_related_name','2024-07-01 13:37:45.634420'),(59,'social_auth','0002_add_related_name','2024-07-01 13:37:45.636287'),(60,'default','0003_alter_email_max_length','2024-07-01 13:37:45.644558'),(61,'social_auth','0003_alter_email_max_length','2024-07-01 13:37:45.645509'),(62,'default','0004_auto_20160423_0400','2024-07-01 13:37:45.654863'),(63,'social_auth','0004_auto_20160423_0400','2024-07-01 13:37:45.656907'),(64,'social_auth','0005_auto_20160727_2333','2024-07-01 13:37:45.664050'),(65,'social_django','0006_partial','2024-07-01 13:37:45.693513'),(66,'social_django','0007_code_timestamp','2024-07-01 13:37:45.720195'),(67,'social_django','0008_partial_timestamp','2024-07-01 13:37:45.740698'),(68,'social_django','0009_auto_20191118_0520','2024-07-01 13:37:45.770298'),(69,'social_django','0010_uid_db_index','2024-07-01 13:37:45.803684'),(70,'social_django','0011_alter_id_fields','2024-07-01 13:37:45.962744'),(71,'social_django','0012_usersocialauth_extra_data_new','2024-07-01 13:37:46.028158'),(72,'social_django','0013_migrate_extra_data','2024-07-01 13:37:46.059785'),(73,'social_django','0014_remove_usersocialauth_extra_data','2024-07-01 13:37:46.085321'),(74,'social_django','0015_rename_extra_data_new_usersocialauth_extra_data','2024-07-01 13:37:46.113210'),(75,'token_blacklist','0001_initial','2024-07-01 13:37:46.241780'),(76,'token_blacklist','0002_outstandingtoken_jti_hex','2024-07-01 13:37:46.266317'),(77,'token_blacklist','0003_auto_20171017_2007','2024-07-01 13:37:46.276483'),(78,'token_blacklist','0004_auto_20171017_2013','2024-07-01 13:37:46.342443'),(79,'token_blacklist','0005_remove_outstandingtoken_jti','2024-07-01 13:37:46.379225'),(80,'token_blacklist','0006_auto_20171017_2113','2024-07-01 13:37:46.408239'),(81,'token_blacklist','0007_auto_20171017_2214','2024-07-01 13:37:46.545795'),(82,'token_blacklist','0008_migrate_to_bigautofield','2024-07-01 13:37:46.686808'),(83,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-07-01 13:37:46.715188'),(84,'token_blacklist','0011_linearizes_history','2024-07-01 13:37:46.716230'),(85,'token_blacklist','0012_alter_outstandingtoken_user','2024-07-01 13:37:46.727463'),(86,'vote','0001_initial','2024-07-01 13:37:46.808562'),(87,'vote','0002_auto_20161229_1022','2024-07-01 13:37:46.808562'),(88,'vote','0003_vote_action','2024-07-01 13:37:46.866125'),(89,'vote','0004_auto_20170110_1150','2024-07-01 13:37:46.898952'),(90,'vote','0005_alter_vote_id','2024-07-01 13:37:46.933746'),(91,'social_django','0004_auto_20160423_0400','2024-07-01 13:37:46.933746'),(92,'social_django','0003_alter_email_max_length','2024-07-01 13:37:46.948761'),(93,'social_django','0005_auto_20160727_2333','2024-07-01 13:37:46.948761'),(94,'social_django','0002_add_related_name','2024-07-01 13:37:46.948761'),(95,'social_django','0001_initial','2024-07-01 13:37:46.948761'),(96,'Movie','0010_alter_movie_budget_alter_movie_revenue','2024-07-07 13:57:10.565776'),(97,'Movie','0011_alter_movie_director','2024-07-07 13:57:10.796628'),(98,'Movie','0012_alter_movie_title','2024-07-07 13:57:10.863017'),(99,'Review','0006_alter_review_movie_alter_vote_review','2024-07-07 13:57:10.903328'),(100,'Movie','0013_alter_movievideo_title','2024-07-07 14:22:12.403743'),(101,'Movie','0014_alter_movievideo_title','2024-07-07 14:26:43.926270'),(102,'Review','0007_review_num_vote_down_review_num_vote_up_and_more','2024-07-08 13:22:26.078667'),(103,'Review','0008_remove_review_num_vote_down_and_more','2024-07-08 13:52:36.197585'),(104,'Rate','0005_alter_rate_account','2024-07-10 09:21:35.634814'),(105,'Review','0009_alter_vote_unique_together','2024-07-11 16:56:34.356227');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 13:16:35
