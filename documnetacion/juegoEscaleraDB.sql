/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.5 		*/
/*  Created On : 04-ago.-2020 4:43:03 p.�m. 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0 
;

/* Drop Tables */

DROP TABLE IF EXISTS `intentos` CASCADE
;

DROP TABLE IF EXISTS `movimientos` CASCADE
;

DROP TABLE IF EXISTS `usuarios` CASCADE
;

/* Create Tables */

CREATE TABLE `intentos`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`numero` VARCHAR(50) NOT NULL,
	`fecha_juego` TIMESTAMP NOT NULL,
	CONSTRAINT `PK_intentos` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `movimientos`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`valor` VARCHAR(50) NOT NULL,
	`fecha_movimiento` TIMESTAMP NOT NULL,
	CONSTRAINT `PK_movimientos` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `usuarios`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`apellido` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `PK_jugadores` PRIMARY KEY (`id` ASC)
)

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `intentos` 
 ADD INDEX `IXFK_intentos_usuarios` (`id` ASC)
;

ALTER TABLE `movimientos` 
 ADD INDEX `IXFK_movimientos_intentos` (`id` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `movimientos` 
 ADD CONSTRAINT `FK_movimientos_intentos`
	FOREIGN KEY (`id`) REFERENCES `intentos` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1 
;